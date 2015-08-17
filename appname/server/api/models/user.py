import base64
from werkzeug.security import generate_password_hash, check_password_hash
# from itsdangerous import URLSafeTimedSerializer
from api import db, login_manager

# from api import config

# pylint:disable=R0903

# login_serializer = URLSafeTimedSerializer(config['default'].SECRET_KEY)


class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(50))
    password_hash = db.Column(db.String(255))
    api_key = db.Column(db.String(50))
    api_key_hash = db.Column(db.String(255))
    authenticated = db.Column(db.Boolean, default=False)

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
        print(password)
        return check_password_hash(self.password_hash, password)

    @property
    def api_key(self):
        # do NOT allow anything read a User's password, EVER
        raise AttributeError('password is not a readable attribute')

    @api_key.setter
    def api_key(self, api_key):
        # new_key = bytes('{}:{}'.format(
            # self.username, self.password_hash), encoding='utf-8')
        self.api_key_hash = generate_password_hash(api_key)

    def verify_api_key(self, api_key):
        # not all users will have API access ...
        if self.api_key_hash:
            return check_password_hash(self.api_key_hash, api_key)
        return False


# needed for front end authentication ...
# @login_manager.user_loader
# def load_user(userid):
    # return User.query.get(userid)


@login_manager.request_loader
def load_user_from_request(request):

    # first, try to login using the api_key url arg
    # api_key = request.args.get('api_key')
    # if api_key:
        # user = User.query.filter_by(api_key=api_key).first()
        # if user:
            # return user

    # next, try to login using Basic Auth
    auth_values = request.headers.get('Authorization')
    if auth_values:
        auth_values = auth_values.replace('Basic ', '', 1)
        try:
            auth_values = base64.b64decode(auth_values)
            # could just save api_key as b'un:pw' ... - maybe
            values = auth_values.decode().split(':')
            in_username = values[0]
            in_api_key = values[1]  # user passes in API key instead of password
        except TypeError:
            pass
        user = User.query.filter_by(username=in_username).first()
        if user and user.verify_api_key(in_api_key):
            return user
        else:
            print('failed to authenticate username and API key!')

    # finally, return None if both methods did not login the user
    return None


# @login_manager.token_loader
# def load_user_from_token(token):
    # pass
