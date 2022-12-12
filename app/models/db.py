from flask_sqlalchemy import SQLAlchemy

import os
production = not os.environ.get("FLASK_DEBUG")
SCHEMA = os.environ.get("SCHEMA")

db = SQLAlchemy()


def add_prefix_for_prod(attr):
    if production:
        return f"{SCHEMA}.{attr}"
    else:
        return attr