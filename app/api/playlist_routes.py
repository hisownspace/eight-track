from flask import Blueprint
from app.models import Playlist
from app.forms import PlaylistForm
from .user_routes import user_routes


playlist_routes = Blueprint('api/playlists', __name__)

@playlist_routes.route('/')
def add_playlist():
    form = PlaylistForm()