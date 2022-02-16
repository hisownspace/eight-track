from .db import db
from datetime import datetime

class Song(db.Model):
    __tablename__ = "songs"

    id = db.Column(db.Integer, primary_key=True)
    genreId = db.Column(db.Integer, db.ForeignKey("genres.id"), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    url = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=True)
    artist = db.Column(db.String, nullable=True)
    length = db.Column(db.Numeric(4,1), nullable=False)
    description = db.Column(db.String(1000))
    public = db.Column(db.Boolean, nullable=False, default=True)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    genre = db.relationship('Genre', back_populates="songs")
    user = db.relationship('User', back_populates="songs")
    comments = db.relationship("Comment", back_populates="song")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "artist": self.artist,
            "url": self.url,
            "length": float(self.length),
            "description": self.description,
            "public": self.public,
            # these keys are associated with other tables
            "user": self.user.username,
            "genre": self.genre.name
        }