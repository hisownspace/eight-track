from app.models import db, Genre


# Adds default genres
def seed_genres():
    hip_hop = Genre(
        name="hip hop"
    )
    folk = Genre(
        name="folk"
    )
    punk = Genre(
        name="punk"
    )
    rock = Genre(
        name="rock"
    )
    blues = Genre(
        name="blues"
    )
    jazz = Genre(
        name="jazz"
    )
    edm = Genre(
        name="edm"
    )
    db.session.add(hip_hop)
    db.session.add(folk)
    db.session.add(punk)
    db.session.add(rock)
    db.session.add(blues)
    db.session.add(jazz)
    db.session.add(edm)

    db.session.commit()

def undo_genres():
    db.session.execute('TRUNCATE genres RESTART IDENTITY CASCADE;')
    db.session.commit()