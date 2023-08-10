from sqlalchemy.sql import text
from app.models import db, User, production, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
        User(
            **{
                "username": "admin",
                "display_name": "admin",
                "email": "admin@eight-track.com",
                "password": "password",
                "image_url": "https://eta-photobucket.s3.amazonaws.com/default-profile-pic.jpeg",
            }
        ),
        User(
            **{
                "username": "demo",
                "display_name": "demo",
                "email": "demo@aa.io",
                "password": "password",
                "image_url": "https://eta-photobucket.s3.amazonaws.com/default-profile-pic.jpeg",
            }
        ),
        User(
            **{
                "username": "raphead",
                "display_name": "raphead",
                "email": "rap@head.com",
                "password": "password",
                "image_url": "https://eta-photobucket.s3.amazonaws.com/default-profile-pic.jpeg",
            }
        ),
        User(
            **{
                "username": "slickrick",
                "display_name": "slickrick",
                "email": "slickrick@eight-track.com",
                "password": "password",
                "image_url": "https://eta-photobucket.s3.amazonaws.com/default-profile-pic.jpeg",
            }
        ),
        User(
            **{
                "username": "oddisee",
                "display_name": "oddisee",
                "email": "odd@isee.org",
                "password": "password",
                "image_url": "https://eta-photobucket.s3.amazonaws.com/default-profile-pic.jpeg",
            }
        ),
        User(
            **{
                "username": "blackstar",
                "display_name": "blackstar",
                "email": "black@star.com",
                "password": "password",
                "image_url": "https://eta-photobucket.s3.amazonaws.com/default-profile-pic.jpeg",
            }
        ),
        User(
            **{
                "username": "jaydilla",
                "display_name": "jaydilla",
                "email": "jay@dilla.io",
                "password": "password",
                "image_url": "https://eta-photobucket.s3.amazonaws.com/default-profile-pic.jpeg",
            }
        ),
        User(
            **{
                "username": "hieroglyphics",
                "display_name": "hieroglyphics",
                "email": "hiero@glyphi.cs",
                "password": "password",
                "image_url": "https://eta-photobucket.s3.amazonaws.com/default-profile-pic.jpeg",
            }
        ),
    ]

    for user in users:
        db.session.add(user)

    db.session.commit()
    return users


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    if production:
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users;"))
        db.session.commit()
