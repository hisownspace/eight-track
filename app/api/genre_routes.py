from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Song, User, Genre

genre_routes = Blueprint('api/genres', __name__)

@genre_routes.route('/')
def get_genres():
    genres = Genre.query.all()
    genres = [genre.to_dict() for genre in genres]
    genres.sort(key=lambda g: g['name'])
    return { "genres": genres }

@genre_routes.route('/<int:id>')
def get_genre_songs(id):
    genre_id = +id
    songs = Song.query.filter_by(genre_id=genre_id).all()
    return { "songs": [song.to_dict() for song in songs] }

# @genre_routes.route('/')
# def get_all_songs_by_genre():
