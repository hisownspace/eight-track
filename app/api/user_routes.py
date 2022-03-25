from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms import PlaylistForm
from app.models import db, User, Playlist, Song
import json

from app.models.playlist import PlayListSong

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    breakBad = Song.query.get(54)
    db.session.delete(breakBad)
    db.session.commit()
    user = User.query.get(id)
    if not user:
        return {"errors": "The requested user could not be found."}
    return user.to_dict()

@user_routes.route('/<int:id>/playlists', methods=["POST"])
@login_required
def add_playlist(id):
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    playlist = Playlist(
        user_id=form.data["userId"],
        name=form.data["name"]
    )

    songList = json.loads(form.data["songs"])

    for index in range(len(songList)):
        song = Song.query.get(int(songList[index]))
        song_in_playlist = PlayListSong(order=index)
        song_in_playlist.song = song
        playlist.songs.append(song_in_playlist)
        
    try:
        db.session.add(playlist)
        db.session.commit()
        return playlist.to_dict()
    except Exception as e:
        return  { "errors": e}


@user_routes.route('/<int:id>/playlists')
def get_user_playlists(id):
    playlists = Playlist.query.filter_by(user_id=id).all()
    return {"playlists": [playlist.to_dict() for playlist in playlists] }
