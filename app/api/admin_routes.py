from flask import Blueprint
from app.models import db, Song

admin_routes = Blueprint("admin", __name__, url_prefix="/admin")


@admin_routes.route("")
def admin():
    songs = Song.query.all()
    return { "songs": [song.admin_to_dict() for song in songs] }