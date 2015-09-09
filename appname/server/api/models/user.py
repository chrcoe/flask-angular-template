import base64
# from flask import g
from werkzeug.security import generate_password_hash, check_password_hash
from api import db, login_manager
# from miguel - not using flask-login ...
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)
from api import config
# from pprint import pprint as pp
# pylint:disable=R0903


class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(50))
    password_hash = db.Column(db.String(255))
    api_key = db.Column(db.String(50))
    # api_key_hash = db.Column(db.String(255))
    authenticated = db.Column(db.Boolean, default=False)

    def __init__(self, username=None, password=None, api_key=None):
        self.username = username
        self.password = password
        self.api_key = api_key

    def generate_auth_token(self, expiration=600):
        # TODO: figure out a better way to get the config setup from the main
        # flask app ...
        _config = config['default']
        s = Serializer(_config.SECRET_KEY, expires_in=expiration)
        return s.dumps({'user_id': self.user_id})

    def get_auth_token(self, expiration=600):
        _config = config['default']
        s = Serializer(_config.SECRET_KEY, expires_in=expiration)
        return s.dumps({'user_id': self.user_id})

    @staticmethod
    def verify_auth_token(token):
        _config = config['default']
        s = Serializer(_config.SECRET_KEY)
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None    # valid token, but expired
        except BadSignature:
            return None    # invalid token
        user = User.query.get(data['user_id'])
        return user

    def is_active(self):
        return True

    def get_id(self):
        return self.user_id

    def is_authenticated(self):
        return True

    def is_anonymous(self):
        return False

    @property
    def password(self):
        # do NOT allow anything read a User's password, EVER
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)


# needed for front end authentication ... maybe (?)
# @login_manager.user_loader
# def load_user(userid):
    # return User.query.get(userid)


@login_manager.token_loader
def load_user_from_token(token):
    pass


@login_manager.request_loader
def load_user_from_request(request):

    # first, try to login using the api_key url arg
    api_key = request.args.get('api_key')
    # pp(request)
    print(api_key)
    if api_key:
        user = User.query.filter_by(api_key=api_key).first()
        # if user and user.verify_api_key(api_key):
        if user:
            # g.user = user
            return user

    # TODO: implement token authentication as well ...

    # next, try to login using Basic Auth
    auth_values = request.headers.get('Authorization')
    if auth_values is None:
        auth_values = request.headers.get('token')

    if auth_values:
        auth_values = auth_values.replace('Basic ', '', 1)
        try:
            auth_values = base64.b64decode(auth_values)
            # could just save api_key as b'un:pw' ... - maybe
            values = auth_values.decode().split(':')
            in_username = values[0]
            in_password = values[1]
        except TypeError:
            pass
        user = User.query.filter_by(username=in_username).first()
        if user and user.verify_password(in_password):
            # g.user = user
            return user
        else:
            print('failed to authenticate using username and password!')

    # finally, return None if both methods did not login the user
    return None


# @login_manager.request_loader
# def load_user_from_request(request):
    # token = request.headers.get('Authorization')
    # if token is None:
    # token = request.args.get('token')

    # if token is not None:
    # username, password = token.split(":")  # naive token
    # user_entry = User.get(username)
    # if (user_entry is not None):
    # user = User(user_entry[0], user_entry[1])
    # if user.verify_password(password):
    # return user
    # return None


# @login_manager.token_loader
# def load_user_from_token(token):
    # pass
