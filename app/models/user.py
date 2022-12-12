from .db import db, development, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if not development:
       __table_args__ = { 'schema': SCHEMA } 

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    display_name = db.Column(db.String(50))
    image_url = db.Column(db.String(255))
    header_url = db.Column(db.String(255))
    bio = db.Column(db.String(1000))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime,
                            nullable=False,
                            default=datetime.now(),
                            onupdate=datetime.now())

    songs = db.relationship("Song", back_populates="user", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
