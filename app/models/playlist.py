from .db import db, production, SCHEMA
from datetime import datetime

class PlayListSong(db.Model):
    __tablename__ = 'playlist_songs'

    if production:
        __table_args__ = { "schema": SCHEMA }

    song_id = db.Column(db.Integer, db.ForeignKey("songs.id"), primary_key=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey("playlists.id"), primary_key=True)
    order = db.Column(db.Integer, nullable=False, primary_key=True)

    playlist = db.relationship("Playlist", back_populates="songs")
    song = db.relationship("Song", back_populates="playlists")

    def to_dict(self):
        return {
            "song_id": self.song_id,
            "playlist_id": self.playlist_id,
            "order": self.order
        }

class Playlist(db.Model):
    __tablename__ = "playlists"

    if production:
        __table_args__ = { "schema": SCHEMA }

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime,
                            nullable=False,
                            default=datetime.now(),
                            onupdate=datetime.now())

    songs = db.relationship('PlayListSong', back_populates='playlist', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "songs": [song.song.to_dict() for song in self.songs],
        }