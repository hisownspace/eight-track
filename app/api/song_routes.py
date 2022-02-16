from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Song
from app.s3_helpers import (
    remove_file_from_s3, upload_file_to_s3, allowed_file, get_unique_filename)

song_routes = Blueprint('api/songs', __name__)

@song_routes.route("/")
def get_all_songs():
    songs = Song.query.all()
    if songs:
        return {"songs": [song.to_dict() for song in songs]}
    else:
        return { "errors": "unknown error" }

@song_routes.route("/", methods=["POST"])
def add_songs():
    if "song" not in request.files:
        return { "errors": "audio file required"}, 400

    song = request.files["song"]

    if not allowed_file(song.filename):
        return { "errors": "file type not permitted" }
    
    song.filename = get_unique_filename(song.filename)

    upload = upload_file_to_s3(song)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    columns = request.form.to_dict()
    print(columns)
    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_song = Song(
                genreId=columns["genreId"],
                userId=columns["userId"],
                url=url,
                title=columns["title"],
                artist=columns["artist"],
                length=columns["length"],
                description=columns["description"],
                public=(True if columns["publicSong"] == "true" else False)
                )
    try:
        db.session.add(new_song)
        db.session.commit()
        print(new_song.id)
        return {"songId": new_song.id}
    except Exception as e:
        remove_file_from_s3(url.rsplit('/')[-1])
        return e, 400