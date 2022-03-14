from flask import Blueprint, request
from app.models import Song, Genre


search_routes = Blueprint("api/search", __name__)

@search_routes.route('')
def search():
    term = request.args.get('q')
    by_artist = Song.query.filter(Song.artist.ilike(f"%{term}%")).all()
    genre = Genre.query.filter_by(name=term).first()
    by_genre = []
    if genre is not None:
        by_genre = Song.query.filter_by(genre_id=genre.id).all()
    by_title = Song.query.filter(Song.title.ilike(f"%{term}%")).all()
    return { "title": [song.to_dict() for song in by_title],
                "genre": [song.to_dict() for song in by_genre],
                "artist": [song.to_dict() for song in by_artist] }
