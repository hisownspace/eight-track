from sqlalchemy.sql import text
from random import choice, random, randint
from math import floor
from datetime import datetime, timedelta

from ..models import db, Comment, production, SCHEMA


def random_datetime():
    start_year = 2020
    end = datetime.now()
    start = datetime(start_year, 1, 1)
    random_date = start + timedelta(
        seconds=randint(0, int((end - start).total_seconds()))
    )
    return random_date


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
            "content": "🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥",
            "timestamp": float(floor(random() * songs["The Guillotine"].to_dict()["length"])),
        },
        {
            "song": songs["The Guillotine"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "🔥🔥🔥💯💯",
            "timestamp": float(floor(random() * songs["The Guillotine"].to_dict()["length"])),
        },
        {
            "song": songs["The Guillotine"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Oh Shit ! is that communism ?",
            "timestamp": float(floor(random() * songs["The Guillotine"].to_dict()["length"])),
        },
        {
            "song": songs["The Guillotine"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Give 'em the guillotine!!!!!!!",
            "timestamp": float(floor(random() * songs["The Guillotine"].to_dict()["length"])),
        },
        {
            "song": songs["The Guillotine"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "best song in the album",
            "timestamp": float(floor(random() * songs["The Guillotine"].to_dict()["length"])),
        },
        {
            "song": songs["X"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "omgggg🔥🔥🔥🔥🔥",
            "timestamp": float(floor(random() * songs["X"].to_dict()["length"])),
        },
        {
            "song": songs["X"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "nice vibes and floww",
            "timestamp": float(floor(random() * songs["X"].to_dict()["length"])),
        },
        {
            "song": songs["X"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "I love this song so much",
            "timestamp": float(floor(random() * songs["X"].to_dict()["length"])),
        },
        {
            "song": songs["X"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Who is this by? Pls message me!!!",
            "timestamp": float(floor(random() * songs["X"].to_dict()["length"])),
        },
        {
            "song": songs["X"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "yes this sounds harddd",
            "timestamp": float(floor(random() * songs["X"].to_dict()["length"])),
        },
        {
            "song": songs["Summertime"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "AHHHHHHH 💥💥💥",
            "timestamp": float(floor(random() * songs["Summertime"].to_dict()["length"])),
        },
        {
            "song": songs["Summertime"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Yooo okay 🤯🔥🔥🔥",
            "timestamp": float(floor(random() * songs["Summertime"].to_dict()["length"])),
        },
        {
            "song": songs["Summertime"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "🔥🔥 goat",
            "timestamp": float(floor(random() * songs["Summertime"].to_dict()["length"])),
        },
        {
            "song": songs["Summertime"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This shit is fucking fire🔥🔥🔥🔥",
            "timestamp": float(floor(random() * songs["Summertime"].to_dict()["length"])),
        },
        {
            "song": songs["Summertime"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "dope shit",
            "timestamp": float(floor(random() * songs["Summertime"].to_dict()["length"])),
        },
        {
            "song": songs["Chain Smoker"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "dis mf hard 🎤🔥🔥",
            "timestamp": float(floor(random() * songs["Chain Smoker"].to_dict()["length"])),
        },
        {
            "song": songs["Chain Smoker"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "I Lоvе IТ Sо MuсН💖💕",
            "timestamp": float(floor(random() * songs["Chain Smoker"].to_dict()["length"])),
        },
        {
            "song": songs["Chain Smoker"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "When i listen to this song, i remember how we practiced to do Breakdance when we were kids, listening to the 'Rock Steady Crew'. Cool track!",
            "timestamp": float(floor(random() * songs["Chain Smoker"].to_dict()["length"])),
        },
        {
            "song": songs["Chain Smoker"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "this track hard",
            "timestamp": float(floor(random() * songs["Chain Smoker"].to_dict()["length"])),
        },
        {
            "song": songs["Chain Smoker"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "sheesh this is big gas",
            "timestamp": float(floor(random() * songs["Chain Smoker"].to_dict()["length"])),
        },
        {
            "song": songs["Numb Numb Juice"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "I like this shit",
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
            "content": "best song ever, had on repeat for 7 hours",
            "timestamp": float(floor(random() * songs["Numb Numb Juice"].to_dict()["length"])),
        },
        {
            "song": songs["Numb Numb Juice"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "damnn shits slaps bro",
            "timestamp": float(floor(random() * songs["Numb Numb Juice"].to_dict()["length"])),
        },
        {
            "song": songs["Numb Numb Juice"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "one of the meanest tracks ive heard. Bigups",
            "timestamp": float(floor(random() * songs["Numb Numb Juice"].to_dict()["length"])),
        },
        {
            "song": songs["Black Man in a White World"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Really a good son",
            "timestamp": float(
                floor(random() * songs["Black Man in a White World"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Black Man in a White World"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "🙌🏿🙌🏿🙌🏿🙌🏿🙌🏿🙌🏿🙌🏿🙌🏿🙌🏿🙌🏿🙌🏿",
            "timestamp": float(
                floor(random() * songs["Black Man in a White World"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Black Man in a White World"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "such a banger, loving this one",
            "timestamp": float(
                floor(random() * songs["Black Man in a White World"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Black Man in a White World"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Classic",
            "timestamp": float(
                floor(random() * songs["Black Man in a White World"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Black Man in a White World"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "such a good song",
            "timestamp": float(
                floor(random() * songs["Black Man in a White World"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Talkin' 'bout A Revolution"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "loveeeee it!!! ayeeeeeee",
            "timestamp": float(
                floor(random() * songs["Talkin' 'bout A Revolution"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Talkin' 'bout A Revolution"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "heeeeeeat🔥🔥",
            "timestamp": float(
                floor(random() * songs["Talkin' 'bout A Revolution"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Talkin' 'bout A Revolution"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This gives me the shivers, yeowwwwww ;)",
            "timestamp": float(
                floor(random() * songs["Talkin' 'bout A Revolution"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Talkin' 'bout A Revolution"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "a good feeling 💟",
            "timestamp": float(
                floor(random() * songs["Talkin' 'bout A Revolution"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Talkin' 'bout A Revolution"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "I’ve been waiting for this for a while now 👏👏👏 Fabulous track ! Thank you ❤️",
            "timestamp": float(
                floor(random() * songs["Talkin' 'bout A Revolution"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Times They Are a Changin'"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "better than original",
            "timestamp": float(
                floor(random() * songs["Times They Are a Changin'"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Times They Are a Changin'"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Been waiting for this 🔥🔥🔥",
            "timestamp": float(
                floor(random() * songs["Times They Are a Changin'"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Times They Are a Changin'"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "this is a Beauty! Thank you so much❤️",
            "timestamp": float(
                floor(random() * songs["Times They Are a Changin'"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Times They Are a Changin'"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "so beautiful and so true",
            "timestamp": float(
                floor(random() * songs["Times They Are a Changin'"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Times They Are a Changin'"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Who sings that? Awesome Voice!",
            "timestamp": float(
                floor(random() * songs["Times They Are a Changin'"].to_dict()["length"])
            ),
        },
        {
            "song": songs["No Mercy In This Land"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "just awesome!!",
            "timestamp": float(
                floor(random() * songs["No Mercy In This Land"].to_dict()["length"])
            ),
        },
        {
            "song": songs["No Mercy In This Land"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Saw him live once. It was amazing",
            "timestamp": float(
                floor(random() * songs["No Mercy In This Land"].to_dict()["length"])
            ),
        },
        {
            "song": songs["No Mercy In This Land"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Fuck yeah!!!",
            "timestamp": float(
                floor(random() * songs["No Mercy In This Land"].to_dict()["length"])
            ),
        },
        {
            "song": songs["No Mercy In This Land"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "finally found the song <3",
            "timestamp": float(
                floor(random() * songs["No Mercy In This Land"].to_dict()["length"])
            ),
        },
        {
            "song": songs["No Mercy In This Land"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Ohhh kayyyy!!",
            "timestamp": float(
                floor(random() * songs["No Mercy In This Land"].to_dict()["length"])
            ),
        },
        {
            "song": songs["River"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Ahhhh that's the spot right there. Lovin this! Tune!",
            "timestamp": float(floor(random() * songs["River"].to_dict()["length"])),
        },
        {
            "song": songs["River"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "ppl need to stop finding this song.. it’s my favorite secret gem >:(",
            "timestamp": float(floor(random() * songs["River"].to_dict()["length"])),
        },
        {
            "song": songs["River"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "holy fuck this hits hard after not listening in ages",
            "timestamp": float(floor(random() * songs["River"].to_dict()["length"])),
        },
        {
            "song": songs["River"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "If only R&B still sounded like this!",
            "timestamp": float(floor(random() * songs["River"].to_dict()["length"])),
        },
        {
            "song": songs["River"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "such pleasant vibes…nicely done.",
            "timestamp": float(floor(random() * songs["River"].to_dict()["length"])),
        },
        {
            "song": songs["Come Down"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "makes me wanna run a business",
            "timestamp": float(floor(random() * songs["Come Down"].to_dict()["length"])),
        },
        {
            "song": songs["Come Down"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This absolutely boosts work productivity",
            "timestamp": float(floor(random() * songs["Come Down"].to_dict()["length"])),
        },
        {
            "song": songs["Come Down"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "love this song and a big fan",
            "timestamp": float(floor(random() * songs["Come Down"].to_dict()["length"])),
        },
        {
            "song": songs["Come Down"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Yoou aare so cool that I fell in loove",
            "timestamp": float(floor(random() * songs["Come Down"].to_dict()["length"])),
        },
        {
            "song": songs["Come Down"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Bruh this shit is so BRRR",
            "timestamp": float(floor(random() * songs["Come Down"].to_dict()["length"])),
        },
        {
            "song": songs["I Against I"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "😍woow supeer)💟",
            "timestamp": float(floor(random() * songs["I Against I"].to_dict()["length"])),
        },
        {
            "song": songs["I Against I"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "🔥🔥🔥🔥🔥🔥💛it",
            "timestamp": float(floor(random() * songs["I Against I"].to_dict()["length"])),
        },
        {
            "song": songs["I Against I"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "WONDERFULLY!❤️👍",
            "timestamp": float(floor(random() * songs["I Against I"].to_dict()["length"])),
        },
        {
            "song": songs["I Against I"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Bad brains rocks!",
            "timestamp": float(floor(random() * songs["I Against I"].to_dict()["length"])),
        },
        {
            "song": songs["I Against I"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "this my wake and bake song",
            "timestamp": float(floor(random() * songs["I Against I"].to_dict()["length"])),
        },
        {
            "song": songs['"29"'],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "💥💥💥💥💥💥",
            "timestamp": float(floor(random() * songs['"29"'].to_dict()["length"])),
        },
        {
            "song": songs['"29"'],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "This band is ridiculous!",
            "timestamp": float(floor(random() * songs['"29"'].to_dict()["length"])),
        },
        {
            "song": songs['"29"'],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Sheeeeesh",
            "timestamp": float(floor(random() * songs['"29"'].to_dict()["length"])),
        },
        {
            "song": songs['"29"'],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Fire fuckin song",
            "timestamp": float(floor(random() * songs['"29"'].to_dict()["length"])),
        },
        {
            "song": songs['"29"'],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee÷eeeeeeeeeeee",
            "timestamp": float(floor(random() * songs['"29"'].to_dict()["length"])),
        },
        {
            "song": songs["Banned in D.C"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "That vibe is truly funky.",
            "timestamp": float(floor(random() * songs["Banned in D.C"].to_dict()["length"])),
        },
        {
            "song": songs["Banned in D.C"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Best song",
            "timestamp": float(floor(random() * songs["Banned in D.C"].to_dict()["length"])),
        },
        {
            "song": songs["Banned in D.C"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "this one goes hard AF 💯",
            "timestamp": float(floor(random() * songs["Banned in D.C"].to_dict()["length"])),
        },
        {
            "song": songs["Banned in D.C"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Legendary",
            "timestamp": float(floor(random() * songs["Banned in D.C"].to_dict()["length"])),
        },
        {
            "song": songs["Banned in D.C"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "so underrated",
            "timestamp": float(floor(random() * songs["Banned in D.C"].to_dict()["length"])),
        },
        {
            "song": songs["Jump!! (Or Get Jumped!!!)((by the future))"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "one of the best",
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
            "content": "Hits different on headphones",
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
            "content": "The world needed to hear this",
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
            "content": "one of the best",
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
            "content": "This is gasoline!",
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
            "content": "got me running circles in my room",
            "timestamp": float(floor(random() * songs["Don't Blow Bubbles"].to_dict()["length"])),
        },
        {
            "song": songs["Don't Blow Bubbles"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "You aare soo cool",
            "timestamp": float(floor(random() * songs["Don't Blow Bubbles"].to_dict()["length"])),
        },
        {
            "song": songs["Don't Blow Bubbles"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "😎Quality",
            "timestamp": float(floor(random() * songs["Don't Blow Bubbles"].to_dict()["length"])),
        },
        {
            "song": songs["Don't Blow Bubbles"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "GOAT song",
            "timestamp": float(floor(random() * songs["Don't Blow Bubbles"].to_dict()["length"])),
        },
        {
            "song": songs["Don't Blow Bubbles"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "💯🥶👿👌",
            "timestamp": float(floor(random() * songs["Don't Blow Bubbles"].to_dict()["length"])),
        },
        {
            "song": songs["Room Full Of Mirrors"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "wow So FIReee",
            "timestamp": float(
                floor(random() * songs["Room Full Of Mirrors"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Room Full Of Mirrors"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "this song fucking fire 🔥🔥🔥🔥🔥🔥",
            "timestamp": float(
                floor(random() * songs["Room Full Of Mirrors"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Room Full Of Mirrors"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "damn! this hits hard",
            "timestamp": float(
                floor(random() * songs["Room Full Of Mirrors"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Room Full Of Mirrors"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "this is quite catchy ngl",
            "timestamp": float(
                floor(random() * songs["Room Full Of Mirrors"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Room Full Of Mirrors"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "💕its Soo FIReeee😍",
            "timestamp": float(
                floor(random() * songs["Room Full Of Mirrors"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Good Golly Miss Molly"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "🖤woow great song!️",
            "timestamp": float(
                floor(random() * songs["Good Golly Miss Molly"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Good Golly Miss Molly"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Songs heavy",
            "timestamp": float(
                floor(random() * songs["Good Golly Miss Molly"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Good Golly Miss Molly"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Cold 🥶",
            "timestamp": float(
                floor(random() * songs["Good Golly Miss Molly"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Good Golly Miss Molly"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "🔥🔥🔥🔥🔥",
            "timestamp": float(
                floor(random() * songs["Good Golly Miss Molly"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Good Golly Miss Molly"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "💯❤️❤️",
            "timestamp": float(
                floor(random() * songs["Good Golly Miss Molly"].to_dict()["length"])
            ),
        },
        {
            "song": songs["American Woman"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "I used to really be able to roll it on out to this number ......",
            "timestamp": float(floor(random() * songs["American Woman"].to_dict()["length"])),
        },
        {
            "song": songs["American Woman"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Epic stuff <3",
            "timestamp": float(floor(random() * songs["American Woman"].to_dict()["length"])),
        },
        {
            "song": songs["American Woman"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "mhm🥰i think hell yeah",
            "timestamp": float(floor(random() * songs["American Woman"].to_dict()["length"])),
        },
        {
            "song": songs["American Woman"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "💙🤣🍓😘",
            "timestamp": float(floor(random() * songs["American Woman"].to_dict()["length"])),
        },
        {
            "song": songs["American Woman"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "The song is pretty good 👍",
            "timestamp": float(floor(random() * songs["American Woman"].to_dict()["length"])),
        },
        {
            "song": songs["The 3rd World"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🧨",
            "timestamp": float(floor(random() * songs["The 3rd World"].to_dict()["length"])),
        },
        {
            "song": songs["The 3rd World"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "been jamming since 12👀",
            "timestamp": float(floor(random() * songs["The 3rd World"].to_dict()["length"])),
        },
        {
            "song": songs["The 3rd World"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "WORD WORD WORD..third WORLD",
            "timestamp": float(floor(random() * songs["The 3rd World"].to_dict()["length"])),
        },
        {
            "song": songs["The 3rd World"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "so on point never stop making music",
            "timestamp": float(floor(random() * songs["The 3rd World"].to_dict()["length"])),
        },
        {
            "song": songs["The 3rd World"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "💯",
            "timestamp": float(floor(random() * songs["The 3rd World"].to_dict()["length"])),
        },
        {
            "song": songs["Johnny B. Goode"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "What started it all",
            "timestamp": float(floor(random() * songs["Johnny B. Goode"].to_dict()["length"])),
        },
        {
            "song": songs["Johnny B. Goode"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "True Rock n Roll",
            "timestamp": float(floor(random() * songs["Johnny B. Goode"].to_dict()["length"])),
        },
        {
            "song": songs["Johnny B. Goode"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Chuck! Chuck, it’s Marvin. Your cousin, Marvin Berry. You know that new sound you’re looking for? Well, listen to this!",
            "timestamp": float(floor(random() * songs["Johnny B. Goode"].to_dict()["length"])),
        },
        {
            "song": songs["Johnny B. Goode"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Could listen to that riff all day",
            "timestamp": float(floor(random() * songs["Johnny B. Goode"].to_dict()["length"])),
        },
        {
            "song": songs["Johnny B. Goode"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "The intro is so amazing",
            "timestamp": float(floor(random() * songs["Johnny B. Goode"].to_dict()["length"])),
        },
        {
            "song": songs["Feeling Good"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "🔥🔥🔥🔥",
            "timestamp": float(floor(random() * songs["Feeling Good"].to_dict()["length"])),
        },
        {
            "song": songs["Feeling Good"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "bro this is tight",
            "timestamp": float(floor(random() * songs["Feeling Good"].to_dict()["length"])),
        },
        {
            "song": songs["Feeling Good"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "🔥🔥🔥🔥❤️",
            "timestamp": float(floor(random() * songs["Feeling Good"].to_dict()["length"])),
        },
        {
            "song": songs["Feeling Good"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "this drop is class",
            "timestamp": float(floor(random() * songs["Feeling Good"].to_dict()["length"])),
        },
        {
            "song": songs["Feeling Good"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Prime mix 🔥",
            "timestamp": float(floor(random() * songs["Feeling Good"].to_dict()["length"])),
        },
        {
            "song": songs["Ruby, My Dear"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "🙌🔥🔥🔥🙌",
            "timestamp": float(floor(random() * songs["Ruby, My Dear"].to_dict()["length"])),
        },
        {
            "song": songs["Ruby, My Dear"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "fire 😧😧😧😧",
            "timestamp": float(floor(random() * songs["Ruby, My Dear"].to_dict()["length"])),
        },
        {
            "song": songs["Ruby, My Dear"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "🙌🔥🔥🔥🙌",
            "timestamp": float(floor(random() * songs["Ruby, My Dear"].to_dict()["length"])),
        },
        {
            "song": songs["Ruby, My Dear"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "we need more art like this",
            "timestamp": float(floor(random() * songs["Ruby, My Dear"].to_dict()["length"])),
        },
        {
            "song": songs["Ruby, My Dear"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "💯",
            "timestamp": float(floor(random() * songs["Ruby, My Dear"].to_dict()["length"])),
        },
        {
            "song": songs["Middle Child"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "❤️❤️",
            "timestamp": float(floor(random() * songs["Middle Child"].to_dict()["length"])),
        },
        {
            "song": songs["Middle Child"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "great",
            "timestamp": float(floor(random() * songs["Middle Child"].to_dict()["length"])),
        },
        {
            "song": songs["Middle Child"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "🥺💗",
            "timestamp": float(floor(random() * songs["Middle Child"].to_dict()["length"])),
        },
        {
            "song": songs["Middle Child"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Best track of the year!! Mindblowing stuff!!!!!!",
            "timestamp": float(floor(random() * songs["Middle Child"].to_dict()["length"])),
        },
        {
            "song": songs["Middle Child"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Loved It ♥",
            "timestamp": float(floor(random() * songs["Middle Child"].to_dict()["length"])),
        },
        {
            "song": songs["Part 2 - Resolution [Breakdown]"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "omg😖😖😖😫😫",
            "timestamp": float(
                floor(random() * songs["Part 2 - Resolution [Breakdown]"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Part 2 - Resolution [Breakdown]"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Hell ya. Diggin this heavily",
            "timestamp": float(
                floor(random() * songs["Part 2 - Resolution [Breakdown]"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Part 2 - Resolution [Breakdown]"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "slaps this does",
            "timestamp": float(
                floor(random() * songs["Part 2 - Resolution [Breakdown]"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Part 2 - Resolution [Breakdown]"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "Always bringing that heat",
            "timestamp": float(
                floor(random() * songs["Part 2 - Resolution [Breakdown]"].to_dict()["length"])
            ),
        },
        {
            "song": songs["Part 2 - Resolution [Breakdown]"],
            "user": choice(users),
            "created_at": random_datetime(),
            "content": "👀",
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
