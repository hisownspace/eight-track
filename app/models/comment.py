from .db import db
from datetime import datetime

class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    songId = db.Column(db.Integer, db.ForeignKey("songs.id"))
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    content = db.Column(db.String(1000))
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="comments")
    song = db.relationship("Song", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "songId": self.songId,
            "userId": self.userId,
            "content": self.content,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }