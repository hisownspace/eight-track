from .db import db

class Song(db.Model):
    __tablename__ = "songs"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=True)
    artist = db.Column(db.String, nullable=True)
    url = db.Column(db.String, nullable=False)