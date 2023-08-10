from flask.cli import AppGroup
from .users import seed_users, undo_users
from .genres import seed_genres, undo_genres
from .songs import seed_songs, undo_songs
from .comments import seed_comments, undo_comments

from app.models.db import production, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    if production:
        undo_users()
        undo_genres()
        undo_songs()
    users = seed_users()
    genres = seed_genres()
    songs = seed_songs()
    comments = seed_comments(users, songs)
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_users()
    undo_genres()
    undo_songs()
    undo_comments()
    # Add other undo functions here
