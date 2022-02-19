from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, InputRequired

v = [DataRequired()]

class CommentForm(FlaskForm):
    userId = IntegerField('user_id', v)
    songId = IntegerField('song_id', v)
    timestamp = IntegerField('timestamp')
    content = StringField('content',
        validators=[DataRequired(),
                    Length(min=1,
                        max=1000,
                        message="Comments can't be longer than 1000 characters.")])