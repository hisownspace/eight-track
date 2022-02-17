from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, HiddenField
from wtforms.validators import DataRequired

# v = [DataRequired()]

class SongEditForm(FlaskForm):
    id = IntegerField('id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    artist = StringField('artist', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    # image_url = StringField('image_url', validators=[DataRequired()])
    # publicSong = BooleanField('publicSong', validators=[DataRequired()])
    genreId = IntegerField('genreId', validators=[DataRequired()])