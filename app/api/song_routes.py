from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Song, User, Genre
from app.s3_helpers import (
    remove_file_from_s3, upload_file_to_s3, allowed_file, get_unique_filename)

song_routes = Blueprint('api/songs', __name__)

@song_routes.route("/")
def get_all_songs():
    songs = Song.query.join(User).join(Genre).all()
    if songs:
        return { "songs": [song.to_dict() for song in songs] }
    else:
        return { "errors": "unknown error" }

@song_routes.route("/<int:id>/")
def get_one_song(id):
    print("hyello")
    song = Song.query.get(id)
    if song:
        return song.to_dict()
    else:
        return { "errors": "unkown error" }

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
                genre_id=columns["genreId"],
                user_id=columns["userId"],
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
        song = Song.query.filter_by(id=new_song.id).join(User).join(Genre).all()
        return { "song": new_song.to_dict() }
    except Exception as e:
        remove_file_from_s3(url.rsplit('/')[-1])
        return {"errors": e}, 400


@song_routes.route("/<int:id>", methods= ["POST"])
def delete_song(id):
    song = Song.query.get(id)
    remove_file_from_s3(song.url.rsplit('/')[-1])
    db.session.delete(song)
    db.session.commit()
    return "Delete successful!"
