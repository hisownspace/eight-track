import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User, Song
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.song_routes import song_routes
from .api.genre_routes import genre_routes
from .api.comment_routes import comment_routes
from .api.presign_routes import presign_routes
from .api.search_routes import search_routes
from .api.playlist_routes import playlist_routes
from .api.admin_routes import admin_routes

from .seeds import seed_commands

from .config import Config



app = Flask(__name__, static_folder="../react-app/build", static_url_path="/")

# Setup login manager
login = LoginManager(app)
login.login_view = "auth.unauthorized"

app.register_blueprint(song_routes, url_prefix="/api/songs")
app.register_blueprint(genre_routes, url_prefix="/api/genres")
app.register_blueprint(comment_routes, url_prefix="/api/comments")
app.register_blueprint(presign_routes, url_prefix="/api/presign")
app.register_blueprint(search_routes, url_prefix="/api/search")
app.register_blueprint(playlist_routes, url_prefix="/api/playlists")
app.register_blueprint(admin_routes, url_prefix="/api/admin")


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix="/api/users")
app.register_blueprint(auth_routes, url_prefix="/api/auth")
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app, expose_headers=["Access-Control-Allow-Origin", "content-length"])


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        "csrf_token",
        generate_csrf(),
        secure=True if os.environ.get("FLASK_ENV") == "production" else False,
        samesite="Strict" if os.environ.get("FLASK_ENV") == "production" else None,
        httponly=True,
    )
    return response


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def react_root(path):
    if path == "favicon.ico":
        return app.send_from_directory("public", "favicon.ico")
    return app.send_static_file("index.html")


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")
