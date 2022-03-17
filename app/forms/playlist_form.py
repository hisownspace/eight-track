from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

v = [DataRequired()]

class PlaylistForm(FlaskForm):
    userId = IntegerField("user_id", v)
    name = StringField("name", v)
    songs = StringField("name", v)
