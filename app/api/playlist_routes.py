from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Playlist, Song, PlayListSong
from app.forms import PlaylistForm
from .user_routes import user_routes
import json


playlist_routes = Blueprint('api/playlists', __name__)

@playlist_routes.route('/<int:id>', methods=['DELETE'])
def remove_playlist(id):
    try:
        playlist = Playlist.query.get(id)
        db.session.delete(playlist)
        db.session.commit()
        return { "message": "Playlist successfully deleted!"}
    except Exception as e:
        return { "message": str(e)}

@playlist_routes.route('/<int:id>', methods=['PUT'])
def update_playlist(id):
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    playlist = Playlist.query.get(id)
    if playlist:
        playlist.name = form.data["name"]
        playlist.songs = []
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