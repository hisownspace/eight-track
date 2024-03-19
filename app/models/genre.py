from .db import db, production, SCHEMA
from datetime import datetime

class Genre(db.Model):
    __tablename__ = "genres"
    
    if production:
        __table_args__ = { "schema": SCHEMA }
        

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime,
                            nullable=False,
                            default=datetime.now(),
                            onupdate=datetime.now())

    songs = db.relationship('Song', back_populates="genre")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }
