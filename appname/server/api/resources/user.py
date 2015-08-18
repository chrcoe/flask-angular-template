from api.models import User
from api import db
from flask import jsonify
from flask_restful import Resource, reqparse, fields, marshal_with
from flask.ext.login import login_required
# pylint:disable=R0201

USER_FIELDS = {
    'username': fields.String,
    'uri':fields.Url(None, absolute=True)
    # 'uri': fields.Url('user', absolute=True)
}


class UserListAPI(Resource):
    '''
    This handles registering and listing a single user.
    POST api.[domain]/v1.0/users for create
    '''

    decorators = [login_required]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('username', type=str, location='json')
        self.reqparse.add_argument('password', type=str, location='json')
        super(UserListAPI, self).__init__()

    @marshal_with(USER_FIELDS, envelope="user")
    def post(self):
        args = self.reqparse.parse_args()
        user = User(
            username=args['username'],
            password=args['password']
        )
        try:
            db.session.add(user)
            db.session.commit()
        except:
            pass
        return user


class UserAPI(Resource):
    '''
    Handles listing a user by user_id.
    GET api.[domain]/v1.0/users/<int:user_id> for retrieve
    '''

    decorators = [login_required]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('username', type=str, location='json')
        self.reqparse.add_argument('password', type=str, location='json')
        super(UserAPI, self).__init__()

    @marshal_with(USER_FIELDS, envelope="user")
    def get(self, user_id):
        return User.query.get_or_404(user_id)

    @marshal_with(USER_FIELDS, envelope="user")
    def post(self):
        args = self.reqparse.parse_args()
        user = User(
            username=args['username'],
            password=args['password']
        )
        try:
            db.session.add(user)
            db.session.commit()
        except:
            pass
        return user
