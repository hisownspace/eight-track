from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms import song_edit_form
from app.models import db, Song, User, Comment
from .song_routes import song_routes
from ..forms.comment_form import CommentForm
from datetime import datetime


comment_routes = Blueprint('api/comments', __name__)


@song_routes.route('/<int:songId>/comments')
def get_song_comments(songId):
    comments = Comment.filter_by(song_id=songId).all()
    if comments:
        return { "comments": [comment.to_dict() for comment in comments] }
    else:
        return {}

@song_routes.route('/<int:id>/comments', methods=["POST"])
def add_comment():

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            song_id=song_id,
            user_id=user_id,
            content=content
        )