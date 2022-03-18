from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Playlist
from app.forms import PlaylistForm
from .user_routes import user_routes


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
