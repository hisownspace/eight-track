import sys
import io
from sqlalchemy import exc
from flask import Blueprint, flash, get_flashed_messages, jsonify, request
from flask_login import login_required
from app.models import db, Song, User, Genre, Peak
from app.forms import SongEditForm
from datetime import datetime
from colorthief import ColorThief
import json

if sys.version_info < (3, 0):
    from urllib2 import urlopen
else:
    from urllib.request import urlopen

from app.s3_helpers import (
    remove_file_from_s3,
    upload_image_file_to_s3,
    upload_music_file_to_s3,
    audio_file,
    get_unique_filename,
    image_file,
)

song_routes = Blueprint("api/songs", __name__)


@song_routes.route("")
def get_all_songs():
    # pork = get_flashed_messages()
    # print(pork)
    # songs = Song.query.join(User).join(Genre).all()
    songs = Song.query.all()
    test = Song.query.filter(Song.title == "X")
    if songs:
        return {"songs": [song.to_dict() for song in songs]}
    else:
        return {"errors": "unknown error"}


@song_routes.route("/<int:id>")
def get_one_song(id):
    song = Song.query.get(id)
    flash(song.title)
    if song and song.image_url:
        fd = urlopen(song.image_url)
        f = io.BytesIO(fd.read())
        color_thief = ColorThief(f)
        palette = color_thief.get_palette(color_count=2, quality=100)
        song_info = song.to_dict()
        song_info["palette"] = palette
        return song_info
    elif song:
        return song.to_dict()
    else:
        return {"errors": "unkown error"}


@song_routes.route("", methods=["POST"])
def add_songs():
    if "song" not in request.files:
        return {"errors": "audio file required"}, 400

    imageUrl = None
    song = request.files["song"]
    if "image" in request.files:
        image = request.files["image"]
        if not image_file(image.filename):
            return {"errors": "file type not permitted for submitted image"}
        image.filename = get_unique_filename(image.filename)
        imageUpload = upload_image_file_to_s3(image)
        if "url" not in imageUpload:
            return imageUpload, 400
        imageUrl = imageUpload["url"]

    if not audio_file(song.filename):
        return {"errors": "file type not permitted for submitted audio file"}

    song.filename = get_unique_filename(song.filename)

    upload = upload_music_file_to_s3(song)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return {"errors": upload}, 400

    columns = request.form.to_dict()
    if float(columns["length"]) >= 1000:
        return {
            "errors": "There was a problem with the song metadata. \
            Try a different song."
        }
        # columns["length"] = 999
    url = upload["url"]
    # flask_login allows us to get the current user from the request
    if imageUrl == "":
        imageUrl = "https://eta-photobucket.s3.amazonaws.com/play-button.svg"
    # print(columns)

    try:
        peaks = [
            Peak(index=idx, value=val if val else 0.0)
            for idx, val in enumerate(
                json.loads(request.form.to_dict()["waveformJson"])
            )
        ]
        [db.session.add(peak) for peak in peaks]
        db.session.commit()
        new_song = Song(
            genre_id=columns["genreId"],
            user_id=columns["userId"],
            url=url,
            image_url=imageUrl,
            title=columns["title"],
            artist=columns["artist"],
            length=columns["length"],
            description=columns["description"],
            created_at=datetime.now(),
            updated_at=datetime.now(),
            public=(True if columns["publicSong"] == "true" else False),
            peaks=peaks,
        )
        # [new_song.peaks.append(peak) for peak in peaks]
    except Exception as e:
        remove_file_from_s3(url.rsplit("/")[-1])
        return {"errors": e}, 400
    try:
        db.session.add(new_song)
        db.session.commit()
        song = Song.query.filter_by(id=new_song.id).join(User).join(Genre).all()
        return {"song": new_song.to_dict()}
    except Exception as e:
        remove_file_from_s3(url.rsplit("/")[-1])
        return {"errors": e}, 400


@song_routes.route("/<int:id>", methods=["DELETE"])
def delete_song(id):
    song = Song.query.get(id)
    remove_file_from_s3(song.url.rsplit("/")[-1])
    db.session.delete(song)
    db.session.commit()
    return {"message": "Delete successful!"}


@song_routes.route("/<int:id>", methods=["PUT"])
def update_song(id):
    imageUrl = None
    if "image" in request.files:
        image = request.files["image"]
        if not image_file(image.filename):
            return {"errors": "file type not permitted for submitted image"}
        image.filename = get_unique_filename(image.filename)
        imageUpload = upload_image_file_to_s3(image)
        if "url" not in imageUpload:
            return imageUpload, 400
        imageUrl = imageUpload["url"]
    song_changes = request.form.to_dict()
    try:
        updated_song = Song.query.get(id)
        updated_song.title = song_changes["title"]
        updated_song.artist = song_changes["artist"]
        updated_song.description = song_changes["description"]
        updated_song.publicSong = song_changes["publicSong"]
        updated_song.genre_id = song_changes["genreId"]
        updated_song.updated_at = datetime.now()
        if imageUrl:
            updated_song.image_url = imageUrl
        db.session.add(updated_song)
        db.session.commit()
        return updated_song.to_dict()
    except Exception as e:
        return {"errors": e}, 400
