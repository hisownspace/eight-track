from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, NumberRange

v = [DataRequired()]

class CommentForm(FlaskForm):
    userId = StringField('user_id', v)
    songId = StringField('song_id', v)
    content = StringField('content',
        validators=[DataRequired(),
                    Length(min=1,
                        max=1000,
                        message="Comments must be no longer than 1000 characters.")])