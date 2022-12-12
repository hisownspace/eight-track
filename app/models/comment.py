from .db import db, production, SCHEMA, add_prefix_for_prod
from datetime import datetime
import time
from math import floor

class Comment(db.Model):
    __tablename__ = "comments"

    if production:
        __table_args__ = { 'schema': SCHEMA }
        

    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    content = db.Column(db.String(1000))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime,
                            nullable=False,
                            default=datetime.now(),
                            onupdate=datetime.now())
    timestamp = db.Column(db.Float)

    user = db.relationship("User", back_populates="comments")
    song = db.relationship("Song", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "user": self.user.to_dict(),
            "song": self.song.to_dict(),
            "content": self.content,
            "timestamp": self.convert_timestamp(),
            "created_at": time.mktime(self.created_at.timetuple()) * 1000,
            "updated_at": self.updated_at,
        }

    def convert_timestamp(self):
        if self.timestamp:
            min = floor(self.timestamp / 60)
            sec = int(self.timestamp % 60)
            if sec < 10:
                sec = '0' + str(sec)
            return f'{min}:{sec}'
        else:
            return ''