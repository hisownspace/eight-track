from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, HiddenField
from wtforms.validators import DataRequired

v = [DataRequired()]

class SongEditForm(FlaskForm):
    title = StringField('title', v)
    artist = StringField('artist', v)
    description = StringField('description', v)
    image_url = StringField('image_url', v)
    public = BooleanField('public', v)
    genre_id = IntegerField('genre_id', v)