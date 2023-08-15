from .db import db, production, SCHEMA, add_prefix_for_prod


class Peak(db.Model):
    __tablename__ = "peaks"

    if production:
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    index = db.Column(db.Integer, nullable=False)
    value = db.Column(db.Float(32), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")))
