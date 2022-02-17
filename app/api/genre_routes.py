from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Song, User, Genre

genre_routes = Blueprint('api/genres', __name__)

@genre_routes.route('/')
def get_genres():
    print("HOWDY PARDNER!")
    genres = Genre.query.all()
    genres = [genre.to_dict() for genre in genres]
    genres.sort(key=lambda g: g['name'])
    return { "genres": genres }

