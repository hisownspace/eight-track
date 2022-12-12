from flask_sqlalchemy import SQLAlchemy

import os
production = not os.environ.get("FLASK_DEBUG")
SCHEMA = os.environ.get("SCHEMA")

db = SQLAlchemy()
