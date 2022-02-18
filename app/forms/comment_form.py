from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange

v = [DataRequired()]

class CommentForm(FlaskForm):
    userId = IntegerField('user_id', v)
    songId = IntegerField('song_id', v)
    timestamp = FloatField('timestamp', v)
    content = StringField('content',
        validators=[DataRequired(),
                    Length(min=1,
                        max=1000,
                        message="Comments must be no longer than 1000 characters.")])