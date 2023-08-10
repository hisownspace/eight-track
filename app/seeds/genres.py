from sqlalchemy.sql import text
from app.models import db, Genre, production, SCHEMA


# Adds default genres
def seed_genres():
    hip_hop = Genre(name="hip hop")
    folk = Genre(name="folk")
    punk = Genre(name="punk")
    rock = Genre(name="rock")
    blues = Genre(name="blues")
    jazz = Genre(name="jazz")
    edm = Genre(name="edm")
    reggae = Genre(name="reggae")
    rnb = Genre(name="r&b")
    genres = [
        {"name": "hip hop"},
        {"name": "folk"},
        {"name": "punk"},
        {"name": "rock"},
        {"name": "blues"},
        {"name": "jazz"},
        {"name": "edm"},
        {"name": "reggae"},
        {"name": "r&b"},
    ]

    for genre in genres:
        db.session.add(Genre(**genre))

    db.session.commit()
    return genres


def undo_genres():
    if production:
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE from genres;"))
        db.session.commit()
