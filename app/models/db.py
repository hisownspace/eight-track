from flask_sqlalchemy import SQLAlchemy

import os
development = os.environ.get("FLASK_DEBUG")
SCHEMA = os.environ.get("SCHEMA")

db = SQLAlchemy()


def add_prefix_for_prod(attr):
    if not development:
        return f"{SCHEMA}.{attr}"
    else:
        return attr