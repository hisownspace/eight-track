from flask import Blueprint, get_flashed_messages, request
from app.models import Song, Genre, Playlist


search_routes = Blueprint("api/search", __name__)


@search_routes.route("")
def search():
    print(get_flashed_messages())
    term = request.args.get("q")
    by_artist = Song.query.filter(Song.artist.ilike(f"%{term}%")).all()
    genre = Genre.query.filter(Genre.name.ilike(f"%{term}%")).first()
    by_playlist = Playlist.query.filter(Playlist.name.ilike(f"%{term}%")).all()
    by_genre = []
    if genre is not None:
        by_genre = Song.query.filter_by(genre_id=genre.id).all()
    by_title = Song.query.filter(Song.title.ilike(f"%{term}%")).all()
    return {
        "title": [song.to_dict() for song in by_title],
        "genre": [song.to_dict() for song in by_genre],
        "artist": [song.to_dict() for song in by_artist],
        "playlist": [song.to_dict() for song in by_playlist],
    }
