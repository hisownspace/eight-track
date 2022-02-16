from flask import Blueprint, json, request, Response
from flask_login import login_required, current_user
from app.models import db, Song, User, Genre
from app.s3_helpers import (
                        remove_file_from_s3,
                        upload_file_to_s3,
                        allowed_file,
                        get_unique_filename
                        )

song_routes = Blueprint('api/songs', __name__)

@song_routes.route("/")
def get_all_songs():
    songs = Song.query.join(User).join(Genre).all()
    if songs:
        return { "songs": [song.to_dict() for song in songs] }
    else:
        return { "errors": "unknown error" }

@song_routes.route("/", methods=["POST"])
def add_songs():
    if "song" not in request.files:
        return { "errors": "audio file required"}

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
    print("COLUMNS", columns)
    url = upload["url"]
    # flask_login allows us to get the current user from the request
    try:
        new_song = Song(
                    genre_id=columns["genreId"],
                    user_id=int(current_user.id),
                    url=url,
                    title=columns["title"],
                    artist=columns["artist"],
                    length=columns["length"],
                    description=columns["description"],
                    public=(True\
                        if columns["publicSong"] == "true"\
                            else False)
                )
        db.session.add(new_song)
        db.session.commit()
        print(new_song.id)
        song = Song.query.filter_by(id=new_song.id)\
            .join(User).join(Genre).all()
        print("song_info")
        print(new_song)
        return Response(response=json.dumps(song=new_song.to_dict()),
                        status=201)
    except Exception as e:
        print("removing file from S3")
        remove_file_from_s3(url.rsplit('/')[-1])
        print(json.dumps(str(e)))
        return Response(response=json.dumps({"errors": str(e)}),
                        status=400)