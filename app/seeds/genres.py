from app.models import db, Genre, development, SCHEMA


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
    reggae = Genre(
        name="reggae"
    )
    rnb = Genre(
        name="r&b"
    )

    db.session.add(hip_hop)
    db.session.add(folk)
    db.session.add(punk)
    db.session.add(rock)
    db.session.add(blues)
    db.session.add(jazz)
    db.session.add(edm)
    db.session.add(reggae)
    db.session.add(rnb)

    db.session.commit()

def undo_genres():
    if not development:
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute('TRUNCATE genres RESTART IDENTITY CASCADE;')
        db.session.commit()