from app.models import db, User, development, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    admin = User(
        username='admin', email='admin@eight-track-app.com', password='password'
    )
    demo = User(
        username='Demo', email='demo@aa.io', password='password'
        )
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password'
        )
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password'
        )

    db.session.add(admin)
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    if not development:
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
        db.session.commit()
