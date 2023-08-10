from sqlalchemy.sql import text
from random import choice, random
from math import floor
from datetime import datetime, timedelta

from ..models import db, Comment, production, SCHEMA


def random_datetime():
    end_year = datetime.now().year
    start_year = 2020
    start = datetime(start_year, 1, 1, 00, 00, 00)
    years = end_year - start_year + 1
    end = start + timedelta(days=365 * years)
    return start + (end - start) * random()


def seed_comments(users, songs):
    comments = [
        {
            "song": songs["Hip-hop"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Hip-hop"].to_dict()["length"])),
        },
        {
            "song": songs["Hip-hop"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "These guys really don't like capitalism...",
            "timestamp": float(floor(random() * songs["Hip-hop"].to_dict()["length"])),
        },
        {
            "song": songs["Hip-hop"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "I LOVE THIS BEAT SO MUCH!!!!",
            "timestamp": float(floor(random() * songs["Hip-hop"].to_dict()["length"])),
        },
        {
            "song": songs["Hip-hop"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Oh damn, this was on the Chappelle Show!",
            "timestamp": float(floor(random() * songs["Hip-hop"].to_dict()["length"])),
        },
        {
            "song": songs["Hip-hop"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "What ever happened to Dead Prez anyways?",
            "timestamp": float(floor(random() * songs["Hip-hop"].to_dict()["length"])),
        },
        {
            "song": songs["The Guillotine"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["The Guillotine"].to_dict()["length"])),
        },
        {
            "song": songs["The Guillotine"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["The Guillotine"].to_dict()["length"])),
        },
        {
            "song": songs["The Guillotine"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["The Guillotine"].to_dict()["length"])),
        },
        {
            "song": songs["The Guillotine"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["The Guillotine"].to_dict()["length"])),
        },
        {
            "song": songs["The Guillotine"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["The Guillotine"].to_dict()["length"])),
        },
        {
            "song": songs["X"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["X"].to_dict()["length"])),
        },
        {
            "song": songs["X"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["X"].to_dict()["length"])),
        },
        {
            "song": songs["X"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["X"].to_dict()["length"])),
        },
        {
            "song": songs["X"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["X"].to_dict()["length"])),
        },
        {
            "song": songs["X"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["X"].to_dict()["length"])),
        },
        {
            "song": songs["Summertime"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Summertime"].to_dict()["length"])),
        },
        {
            "song": songs["Summertime"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Summertime"].to_dict()["length"])),
        },
        {
            "song": songs["Summertime"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Summertime"].to_dict()["length"])),
        },
        {
            "song": songs["Summertime"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Summertime"].to_dict()["length"])),
        },
        {
            "song": songs["Summertime"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Summertime"].to_dict()["length"])),
        },
        {
            "song": songs["Chain Smoker"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Chain Smoker"].to_dict()["length"])),
        },
        {
            "song": songs["Chain Smoker"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Chain Smoker"].to_dict()["length"])),
        },
        {
            "song": songs["Chain Smoker"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Chain Smoker"].to_dict()["length"])),
        },
        {
            "song": songs["Chain Smoker"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Chain Smoker"].to_dict()["length"])),
        },
        {
            "song": songs["Chain Smoker"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Chain Smoker"].to_dict()["length"])),
        },
        {
            "song": songs["Numb Numb Juice"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Numb Numb Juice"].to_dict()["length"])),
        },
        {
            "song": songs["Numb Numb Juice"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Numb Numb Juice"].to_dict()["length"])),
        },
        {
            "song": songs["Numb Numb Juice"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Numb Numb Juice"].to_dict()["length"])),
        },
        {
            "song": songs["Numb Numb Juice"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Numb Numb Juice"].to_dict()["length"])),
        },
        {
            "song": songs["Numb Numb Juice"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Numb Numb Juice"].to_dict()["length"])),
        },
        {
            "song": songs["Black Man in a White World"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Black Man in a White World"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Black Man in a White World"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Black Man in a White World"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Black Man in a White World"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Black Man in a White World"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Black Man in a White World"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Black Man in a White World"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Black Man in a White World"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Black Man in a White World"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Talkin' 'bout A Revolution"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Talkin' 'bout A Revolution"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Talkin' 'bout A Revolution"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Talkin' 'bout A Revolution"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Talkin' 'bout A Revolution"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Talkin' 'bout A Revolution"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Talkin' 'bout A Revolution"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Talkin' 'bout A Revolution"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Talkin' 'bout A Revolution"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Talkin' 'bout A Revolution"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Times They Are a Changin'"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Times They Are a Changin'"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Times They Are a Changin'"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Times They Are a Changin'"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Times They Are a Changin'"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Times They Are a Changin'"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Times They Are a Changin'"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Times They Are a Changin'"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Times They Are a Changin'"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Times They Are a Changin'"].to_dict()["length"])
            ),
        },
        {
            "song": songs["No Mercy In This Land"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["No Mercy In This Land"].to_dict()["length"])
            ),
        },
        {
            "song": songs["No Mercy In This Land"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["No Mercy In This Land"].to_dict()["length"])
            ),
        },
        {
            "song": songs["No Mercy In This Land"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["No Mercy In This Land"].to_dict()["length"])
            ),
        },
        {
            "song": songs["No Mercy In This Land"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["No Mercy In This Land"].to_dict()["length"])
            ),
        },
        {
            "song": songs["No Mercy In This Land"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["No Mercy In This Land"].to_dict()["length"])
            ),
        },
        {
            "song": songs["River"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["River"].to_dict()["length"])),
        },
        {
            "song": songs["River"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["River"].to_dict()["length"])),
        },
        {
            "song": songs["River"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["River"].to_dict()["length"])),
        },
        {
            "song": songs["River"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["River"].to_dict()["length"])),
        },
        {
            "song": songs["River"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["River"].to_dict()["length"])),
        },
        {
            "song": songs["Come Down"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Come Down"].to_dict()["length"])),
        },
        {
            "song": songs["Come Down"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Come Down"].to_dict()["length"])),
        },
        {
            "song": songs["Come Down"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Come Down"].to_dict()["length"])),
        },
        {
            "song": songs["Come Down"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Come Down"].to_dict()["length"])),
        },
        {
            "song": songs["Come Down"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Come Down"].to_dict()["length"])),
        },
        {
            "song": songs["I Against I"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["I Against I"].to_dict()["length"])),
        },
        {
            "song": songs["I Against I"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["I Against I"].to_dict()["length"])),
        },
        {
            "song": songs["I Against I"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["I Against I"].to_dict()["length"])),
        },
        {
            "song": songs["I Against I"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["I Against I"].to_dict()["length"])),
        },
        {
            "song": songs["I Against I"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["I Against I"].to_dict()["length"])),
        },
        {
            "song": songs['"29"'],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs['"29"'].to_dict()["length"])),
        },
        {
            "song": songs['"29"'],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs['"29"'].to_dict()["length"])),
        },
        {
            "song": songs['"29"'],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs['"29"'].to_dict()["length"])),
        },
        {
            "song": songs['"29"'],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs['"29"'].to_dict()["length"])),
        },
        {
            "song": songs['"29"'],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs['"29"'].to_dict()["length"])),
        },
        {
            "song": songs["Banned in D.C"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Banned in D.C"].to_dict()["length"])),
        },
        {
            "song": songs["Banned in D.C"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Banned in D.C"].to_dict()["length"])),
        },
        {
            "song": songs["Banned in D.C"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Banned in D.C"].to_dict()["length"])),
        },
        {
            "song": songs["Banned in D.C"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Banned in D.C"].to_dict()["length"])),
        },
        {
            "song": songs["Banned in D.C"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Banned in D.C"].to_dict()["length"])),
        },
        {
            "song": songs["Jump!! (Or Get Jumped!!!)((by the future))"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(
                    random()
                    * songs["Jump!! (Or Get Jumped!!!)((by the future))"].to_dict()["length"]
                )
            ),
        },
        {
            "song": songs["Jump!! (Or Get Jumped!!!)((by the future))"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(
                    random()
                    * songs["Jump!! (Or Get Jumped!!!)((by the future))"].to_dict()["length"]
                )
            ),
        },
        {
            "song": songs["Jump!! (Or Get Jumped!!!)((by the future))"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(
                    random()
                    * songs["Jump!! (Or Get Jumped!!!)((by the future))"].to_dict()["length"]
                )
            ),
        },
        {
            "song": songs["Jump!! (Or Get Jumped!!!)((by the future))"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(
                    random()
                    * songs["Jump!! (Or Get Jumped!!!)((by the future))"].to_dict()["length"]
                )
            ),
        },
        {
            "song": songs["Jump!! (Or Get Jumped!!!)((by the future))"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(
                    random()
                    * songs["Jump!! (Or Get Jumped!!!)((by the future))"].to_dict()["length"]
                )
            ),
        },
        {
            "song": songs["Don't Blow Bubbles"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Don't Blow Bubbles"].to_dict()["length"])),
        },
        {
            "song": songs["Don't Blow Bubbles"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Don't Blow Bubbles"].to_dict()["length"])),
        },
        {
            "song": songs["Don't Blow Bubbles"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Don't Blow Bubbles"].to_dict()["length"])),
        },
        {
            "song": songs["Don't Blow Bubbles"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Don't Blow Bubbles"].to_dict()["length"])),
        },
        {
            "song": songs["Don't Blow Bubbles"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Don't Blow Bubbles"].to_dict()["length"])),
        },
        {
            "song": songs["Room Full Of Mirrors"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Room Full Of Mirrors"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Room Full Of Mirrors"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Room Full Of Mirrors"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Room Full Of Mirrors"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Room Full Of Mirrors"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Room Full Of Mirrors"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Room Full Of Mirrors"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Room Full Of Mirrors"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Room Full Of Mirrors"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Good Golly Miss Molly"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Good Golly Miss Molly"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Good Golly Miss Molly"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Good Golly Miss Molly"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Good Golly Miss Molly"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Good Golly Miss Molly"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Good Golly Miss Molly"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Good Golly Miss Molly"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Good Golly Miss Molly"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Good Golly Miss Molly"].to_dict()["length"])
            ),
        },
        {
            "song": songs["American Woman"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["American Woman"].to_dict()["length"])),
        },
        {
            "song": songs["American Woman"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["American Woman"].to_dict()["length"])),
        },
        {
            "song": songs["American Woman"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["American Woman"].to_dict()["length"])),
        },
        {
            "song": songs["American Woman"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["American Woman"].to_dict()["length"])),
        },
        {
            "song": songs["American Woman"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["American Woman"].to_dict()["length"])),
        },
        {
            "song": songs["The 3rd World"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["The 3rd World"].to_dict()["length"])),
        },
        {
            "song": songs["The 3rd World"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["The 3rd World"].to_dict()["length"])),
        },
        {
            "song": songs["The 3rd World"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["The 3rd World"].to_dict()["length"])),
        },
        {
            "song": songs["The 3rd World"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["The 3rd World"].to_dict()["length"])),
        },
        {
            "song": songs["The 3rd World"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["The 3rd World"].to_dict()["length"])),
        },
        {
            "song": songs["Johnny B. Goode"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Johnny B. Goode"].to_dict()["length"])),
        },
        {
            "song": songs["Johnny B. Goode"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Johnny B. Goode"].to_dict()["length"])),
        },
        {
            "song": songs["Johnny B. Goode"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Johnny B. Goode"].to_dict()["length"])),
        },
        {
            "song": songs["Johnny B. Goode"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Johnny B. Goode"].to_dict()["length"])),
        },
        {
            "song": songs["Johnny B. Goode"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Johnny B. Goode"].to_dict()["length"])),
        },
        {
            "song": songs["Feeling Good"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Feeling Good"].to_dict()["length"])),
        },
        {
            "song": songs["Feeling Good"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Feeling Good"].to_dict()["length"])),
        },
        {
            "song": songs["Feeling Good"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Feeling Good"].to_dict()["length"])),
        },
        {
            "song": songs["Feeling Good"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Feeling Good"].to_dict()["length"])),
        },
        {
            "song": songs["Feeling Good"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Feeling Good"].to_dict()["length"])),
        },
        {
            "song": songs["Ruby, My Dear"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Ruby, My Dear"].to_dict()["length"])),
        },
        {
            "song": songs["Ruby, My Dear"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Ruby, My Dear"].to_dict()["length"])),
        },
        {
            "song": songs["Ruby, My Dear"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Ruby, My Dear"].to_dict()["length"])),
        },
        {
            "song": songs["Ruby, My Dear"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Ruby, My Dear"].to_dict()["length"])),
        },
        {
            "song": songs["Ruby, My Dear"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Ruby, My Dear"].to_dict()["length"])),
        },
        {
            "song": songs["Middle Child"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Middle Child"].to_dict()["length"])),
        },
        {
            "song": songs["Middle Child"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Middle Child"].to_dict()["length"])),
        },
        {
            "song": songs["Middle Child"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Middle Child"].to_dict()["length"])),
        },
        {
            "song": songs["Middle Child"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Middle Child"].to_dict()["length"])),
        },
        {
            "song": songs["Middle Child"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(floor(random() * songs["Middle Child"].to_dict()["length"])),
        },
        {
            "song": songs["Part 2 - Resolution [Breakdown]"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Part 2 - Resolution [Breakdown]"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Part 2 - Resolution [Breakdown]"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Part 2 - Resolution [Breakdown]"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Part 2 - Resolution [Breakdown]"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Part 2 - Resolution [Breakdown]"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Part 2 - Resolution [Breakdown]"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Part 2 - Resolution [Breakdown]"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Part 2 - Resolution [Breakdown]"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This song is fire",
            "timestamp": float(
                floor(random() * songs["Part 2 - Resolution [Breakdown]"].to_dict()["length"])
            ),
        },
    ]

    for comment in comments:
        comment["updated_at"] = comment["created_at"]
        db.session.add(Comment(**comment))
        db.session.commit()


def undo_comments():
    if production:
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM comments;"))
        db.session.commit()
