from .db import db
from datetime import datetime

playlist_songs = db.Table('playlist_songs',
    db.Column('song_id',
        db.Integer,
        db.ForeignKey("songs.id"),
        nullable=False),
    db.Column('playlist_id',
        db.Integer,
        db.ForeignKey("playlists.id"),
        nullable=False),
    db.Column('order',
        db.Integer,
        nullable=False),
)

class Playlist(db.Model):
    __tablename__ = "playlists"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime,
                            nullable=False,
                            default=datetime.now(),
                            onupdate=datetime.now())

    songs = db.relationship('Song',
                            secondary=playlist_songs,
                            backref='playlists')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "songs": [song.id for song in self.songs],
        }