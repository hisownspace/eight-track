from flask import Blueprint, request
from flask_login import login_required
from app.models import Playlist
from app.forms import PlaylistForm
from .user_routes import user_routes


playlist_routes = Blueprint('playlists', __name__)

@user_routes.route('/<int:id>/playlists', methods=["POST"])
@login_required
def add_playlist(id):
    print("-------------------------------------- i'm in!!!")
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print(form.data["userId"])
    print(form.data["name"])
    print(form.data["songs"])
    print(form.data)
    return form.data["songs"]