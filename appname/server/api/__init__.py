from flask import Flask
from flask_restful import Api
from flask.ext.sqlalchemy import SQLAlchemy

from config import config

# this must happen before importing the resources to avoid import conflicts
db = SQLAlchemy()
from api import endpoints


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    # print(config[config_name].IS_LOCAL)

    # if config[config_name].IS_LOCAL:
    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers',
                             'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods',
                             'GET,PUT,POST,DELETE')
        return response

    # initialize the DB using the app config info
    db.init_app(app)

    # initialize the API object
    api = Api(app)

    # initialize the endpoints
    endpoints.init(api)

    return app
