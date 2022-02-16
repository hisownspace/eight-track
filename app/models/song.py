from .db import db
from datetime import datetime
from math import ceil

class Song(db.Model):
    __tablename__ = "songs"

    id = db.Column(db.Integer, primary_key=True)
    genre_id = db.Column(db.Integer, db.ForeignKey("genres.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    url = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)
    artist = db.Column(db.String, nullable=False)
    length = db.Column(db.Numeric(4,1), nullable=False)
    description = db.Column(db.String(1000))
    public = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    genre = db.relationship('Genre', back_populates="songs")
    user = db.relationship('User', back_populates="songs")
    comments = db.relationship("Comment", back_populates="song")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "artist": self.artist,
            "url": self.url,
            "length": ceil(float(str(self.length))),
            "description": self.description,
            "public": self.public,
            # these keys are associated with other tables
            "user": self.user.to_dict(),
            "genre": self.genre.name
        }
    
    
    @db.validates('title')
    def validate_title(self, key, address):
        if address == '':
            raise ValueError("Title field must not be empty")
    
    @db.validates('artist')
    def validate_title(self, key, address):
        if address == '':
            raise ValueError("Artist field must not be empty")