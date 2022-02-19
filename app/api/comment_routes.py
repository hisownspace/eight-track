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
    comments = Comment.query.filter_by(song_id=songId).all()
    if comments:
        return { "comments": [comment.to_dict() for comment in comments] }
    else:
        return {}

@song_routes.route('/<int:id>/comments', methods=["POST"])
def add_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            song_id=form.data['songId'],
            user_id=form.data['userId'],
            timestamp=form.data['timestamp'],
            content=form.data['content'],
            created_at=datetime.now(),
            updated_at=datetime.now(),
        )
        db.session.add(comment)
        db.session.commit()
        comments = Comment.query.order_by(Comment.created_at).all()
        return { "comments": [comment.to_dict() for comment in comments] }
    else:
        return { "errors": "An unkown error occurred. Please try again."}

@comment_routes.route('/<int:id>', methods=["DELETE"])
def delete_comment(id):
    try:
        comment = Comment.query.get(id)
        db.session.delete(comment)
        db.session.commit()
        return { "message": "Comment successfully deleted!"}
    except Exception as e:
        return { "message": str(e)}

# @comment_routes.route('/<int:id>', methods=["PUT"])
# def update_comment(id):
#     form = CommentForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         comment = Comment.query.get(id)
#         comment.content=form.data['content']
#         db.session.add(comment)
#         db.session.commit()
#         comments = Comment.query.all()
#         return { "comments": [comment.to_dict() for comment in comments] }
#     else:
#         return { "errors": "An unkown error occurred. Please try again."}