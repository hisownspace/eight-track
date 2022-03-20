from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

v = [DataRequired()]

class EditPlaylistForm(FlaskForm):
    playlistId = IntegerField("playlistId", v)
    name = StringField("name", v)
    songs = StringField("songs", v)
