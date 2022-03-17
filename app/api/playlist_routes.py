from flask import Blueprint
from app.models import Playlist
from app.forms import PlaylistForm


playlist_routes = Blueprint('api/playlists', __name__)

@song_routes.route('/')
def add_playlist():
    form = PlaylistForm()