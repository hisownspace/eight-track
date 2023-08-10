from app.models import Song, db, production, SCHEMA

songs = {
    "Hip-hop": Song(
        **{
            "id": 1,
            "genre_id": 1,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/2dbe2e184bb14340a5c8c1d2fa2ce5a6.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/e644875418c440e8aa706de6b6cb340f.jpg",
            "title": "Hip-hop",
            "artist": "Dead Prez",
            "length": 213.9,
            "description": "",
            "public": True,
        }
    ),
    "The Guillotine": Song(
        **{
            "id": 2,
            "genre_id": 1,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/9d95b552dd434376a45ee991e6843017.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/c74548a7c60846ce8840112817cbf246.jpg",
            "title": "The Guillotine",
            "artist": "The Coup",
            "length": 285.3,
            "description": "The rich gonna get what's coming to 'em.",
            "public": True,
        }
    ),
    "X": Song(
        **{
            "id": 4,
            "genre_id": 1,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/a5cf2b4ed14846a6a0046c82c9cf4e65.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/2d8a68c3729a47c39658d6a815cd5f00.jpg",
            "title": "X",
            "artist": "Kendrick Lamar, ScHoolboy Q, 2 Chainz, Saudi",
            "length": 267.5,
            "description": "",
            "public": True,
        }
    ),
    "Summertime": Song(
        **{
            "id": 5,
            "genre_id": 1,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/9e4018ec9f434ee49721b0d2d2628ed1.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/98fe8f74de0f4b90951a457719c08d54.jpg",
            "title": "Summertime",
            "artist": "CLPPNG",
            "length": 243.0,
            "description": "A celebration and lamentation of the summer.",
            "public": True,
        }
    ),
    "Chain Smoker": Song(
        **{
            "id": 6,
            "genre_id": 1,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/998840fa44754621870c80228c117731.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/2a43bbc605bd41a09de571e95c124c95.jpg",
            "title": "Chain Smoker",
            "artist": "Chance the Rapper",
            "length": 210.6,
            "description": "",
            "public": True,
        }
    ),
    "Numb Numb Juice": Song(
        **{
            "id": 3,
            "genre_id": 1,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/66e21e345be34ec19061c30ba8b06576.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/f8ea647475a447e09feccde3df74203d.jpg",
            "title": "Numb Numb Juice",
            "artist": "Schoolboy Q",
            "length": 107.2,
            "description": "",
            "public": True,
        }
    ),
    "Black Man in a White World": Song(
        **{
            "id": 7,
            "genre_id": 2,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/cd44df5db7364b2e9fffd30dcee5a257.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/8aa0d103b47b4a2dbb80220ce231020c.jpeg",
            "title": "Black Man in a White World",
            "artist": "Michael Kinawuka",
            "length": 259.0,
            "description": "",
            "public": True,
        }
    ),
    "Talkin' 'bout A Revolution": Song(
        **{
            "id": 8,
            "genre_id": 2,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/23ed3aed74884a6e842b931a405121f6.flac",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/bf324306c86e4e20bd104b30ffa9bb07.jpg",
            "title": "Talkin' 'bout A Revolution",
            "artist": "Tracy Chapman",
            "length": 159.2,
            "description": "",
            "public": True,
        }
    ),
    "Times They Are a Changin'": Song(
        **{
            "id": 9,
            "genre_id": 2,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/7ad6ef0b6269412cb905fa61062f7ccd.flac",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/bffaeeb517f8481fa76fab7fd7c8dfe9.jpg",
            "title": "Times They Are a Changin'",
            "artist": "Nina Simone",
            "length": 359.2,
            "description": "Amazing cover of an amazing song.",
            "public": True,
        }
    ),
    "No Mercy In This Land": Song(
        **{
            "id": 10,
            "genre_id": 2,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/dd9c995588f3417ea05be8bdd65c46f2.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/a949569d1e294eb8b309ccb091a7dc91.jpg",
            "title": "No Mercy In This Land",
            "artist": "Ben Harper",
            "length": 225.1,
            "description": "",
            "public": True,
        }
    ),
    "River": Song(
        **{
            "id": 11,
            "genre_id": 2,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/6a893e4c3ab74576bfbe55b8b1d57a63.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/f6ca169421444486b45d106d62258548.jpg",
            "title": "River",
            "artist": "Leon Bridges",
            "length": 240.2,
            "description": "",
            "public": True,
        }
    ),
    "Come Down": Song(
        **{
            "id": 12,
            "genre_id": 1,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/25810d71cfb64640b46ed5490d4ad1e1.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/e3ed49cc6db14304907f47a6ea669a30.jpg",
            "title": "Come Down",
            "artist": "anderson .paak",
            "length": 176.7,
            "description": "",
            "public": True,
        }
    ),
    "I Against I": Song(
        **{
            "id": 13,
            "genre_id": 3,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/5e3ab211fccc4da081c9466a16df229b.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/a109165e59994ffeafe9d789e17f4968.jpg",
            "title": "I Against I",
            "artist": "Bad Brains",
            "length": 170.7,
            "description": "",
            "public": True,
        }
    ),
    '"29"': Song(
        **{
            "id": 14,
            "genre_id": 3,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/61a4ac33f53f4e96a6efd586f53ae9c5.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/858a946341f243af9900c0c60ecf9c60.jpg",
            "title": '"29"',
            "artist": "Soul Glo",
            "length": 248.1,
            "description": "",
            "public": True,
        }
    ),
    "Banned in D.C": Song(
        **{
            "id": 15,
            "genre_id": 3,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/6c05310d38bc460b9fa1a833d8935e32.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/9d24f9214eeb42a3b7c917f5c6d1ac67.jpg",
            "title": "Banned in D.C",
            "artist": "Bad Brains",
            "length": 117.7,
            "description": "",
            "public": True,
        }
    ),
    "Jump!! (Or Get Jumped!!!)((by the future))": Song(
        **{
            "id": 16,
            "genre_id": 3,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/4a44427e65224fd2a652927560898557.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/ae9bdbfa38074494a746c5952b38ac29.jpg",
            "title": "Jump!! (Or Get Jumped!!!)((by the future))",
            "artist": "Soul Glo",
            "length": 260.7,
            "description": "",
            "public": True,
        }
    ),
    "Don't Blow Bubbles": Song(
        **{
            "id": 17,
            "genre_id": 3,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/f7e57a1b16da4023b4783550b065fc54.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/2b9e29da98eb4e49bec13d66fcf5bfed.jpg",
            "title": "Don't Blow Bubbles",
            "artist": "Bad Brains",
            "length": 183.1,
            "description": "",
            "public": True,
        }
    ),
    "Room Full Of Mirrors": Song(
        **{
            "id": 18,
            "genre_id": 4,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/7c36ab115db3404cad45a1420de345cd.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/1535d874b4a4406f9ba77a076f76101e.jpg",
            "title": "Room Full Of Mirrors",
            "artist": "Jimi Hendrix",
            "length": 200.9,
            "description": "",
            "public": True,
        }
    ),
    "Good Golly Miss Molly": Song(
        **{
            "id": 19,
            "genre_id": 4,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/fd2d8eec2d26400e9d1b9da54c861933.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/40a9bff0ed574a24964eec1141bf011a.jpg",
            "title": "Good Golly Miss Molly",
            "artist": "Little Richard",
            "length": 129.9,
            "description": "",
            "public": True,
        }
    ),
    "American Woman": Song(
        **{
            "id": 20,
            "genre_id": 4,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/9668bb3ae41f4f9ebe65b1e25e7dc01a.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/0f0eb3293cab4c7a8a8602559c8a5d6d.jpg",
            "title": "American Woman",
            "artist": "Lenny Kravitz",
            "length": 266.7,
            "description": "",
            "public": True,
        }
    ),
    "The 3rd World": Song(
        **{
            "id": 21,
            "genre_id": 1,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/d0d419f1d33643979de7983b199ca4ba.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/14bfaa3f987a402c85e98541b6c43841.jpg",
            "title": "The 3rd World",
            "artist": "Immortal Technique",
            "length": 284.9,
            "description": "",
            "public": True,
        }
    ),
    "Johnny B. Goode": Song(
        **{
            "id": 22,
            "genre_id": 4,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/4573b812d7c44e9283851ac3cc2f8f0c.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/0262302518c34909ac85c114b876d7ed.jpg",
            "title": "Johnny B. Goode",
            "artist": "Chuck Berry",
            "length": 161.1,
            "description": "",
            "public": True,
        }
    ),
    "Feeling Good": Song(
        **{
            "id": 23,
            "genre_id": 1,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/cf763710b6394d6d83160487918cbdf4.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/00596ae956cd46979a36ea75faec4b3a.jpg",
            "title": "Feeling Good",
            "artist": "Nina Simone and Lauryn Hill",
            "length": 299.0,
            "description": "",
            "public": True,
        }
    ),
    "Ruby, My Dear": Song(
        **{
            "id": 24,
            "genre_id": 6,
            "user_id": 1,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/665e5af2d5104703a1c8f68303a4e70b.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/8b62e3db6bc9401f9eeb5505566c6400.jpg",
            "title": "Ruby, My Dear",
            "artist": "Thelonious Monk & John Coltrane",
            "length": 381.9,
            "description": "",
            "public": True,
        }
    ),
    "Middle Child": Song(
        **{
            "id": 25,
            "genre_id": 1,
            "user_id": 2,
            "url": "https://d3b4kmpqmm0e8t.cloudfront.net/b64ea1c5f8984cdf961b9a37d67fe79a.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/dca5c7b15fe94e7381a1b500a92c4059.jpeg",
            "title": "Middle Child",
            "artist": "J Cole",
            "length": 213.6,
            "description": "",
            "public": True,
        }
    ),
    "Part 2 - Resolution [Breakdown]": Song(
        **{
            "id": 27,
            "genre_id": 6,
            "user_id": 2,
            "url": "https:///9a2d372196734d27a1e3b45001abc887.mp3",
            "image_url": "https://eta-photobucket.s3.amazonaws.com/aec4b7d3e77e4deca94529dba1716153.jpg",
            "title": "Part 2 - Resolution [Breakdown]",
            "artist": "John Coltrane",
            "length": 133.1,
            "description": "",
            "public": True,
        }
    ),
}


def seed_songs():
    for song in songs.values():
        db.session.add(song)
    db.session.commit()
    return songs


def undo_songs():
    if production:
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM songs;")
        db.session.commit()