from .db import db, production, SCHEMA, add_prefix_for_prod
from datetime import datetime
import time
from math import ceil

class Song(db.Model):
    __tablename__ = "songs"

    if production:
        print(SCHEMA)
        __table_args__ = { "schema": SCHEMA }

    id = db.Column(db.Integer, primary_key=True)
    genre_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("genres.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    url = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String)
    title = db.Column(db.String, nullable=True)
    artist = db.Column(db.String, nullable=True)
    length = db.Column(db.Numeric(4,1), nullable=False)
    description = db.Column(db.String(1000))
    public = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime,
                            nullable=False,
                            default=datetime.now(),
                            onupdate=datetime.now())

    genre = db.relationship('Genre', back_populates="songs")
    user = db.relationship('User', back_populates="songs")
    comments = db.relationship("Comment", back_populates="song", cascade="all, delete-orphan")
    playlists = db.relationship('PlayListSong', back_populates='song', cascade="all, delete-orphan")


    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "artist": self.artist,
            "url": self.url,
            "image_url": self.image_url,
            "length": ceil(float(str(self.length))),
            "description": self.description,
            "public": self.public,
            "created_at": time.mktime(self.created_at.timetuple()) * 1000,
            # these keys are associated with other tables
            "user": self.user.to_dict(),
            "genre": self.genre.to_dict(),
            # playlists is backrefed in the playlist model
            # "playlists": [playlist.to_dict() for playlist in self.playlists]
        }


    def admin_to_dict(self):
        return {
            "title": self.title,
            "artist": self.artist,
            "url": self.url,
            "image_url": self.image_url,
            "length": ceil(float(str(self.length))),
            "description": self.description,
            "public": self.public,
            "created_at": time.mktime(self.created_at.timetuple()) * 1000,
            "user_id": self.user_id,
            "genre_id": self.genre_id,
        }