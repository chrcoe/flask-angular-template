from flask import abort
from api.models import Cookie
from api.models import db
from flask_restful import Resource, reqparse, fields, marshal_with

cookie_fields = {
    'cookie_name': fields.String,
    'cookie_recipe_url': fields.String,
    'quantity': fields.Integer,
    'uri': fields.Url('cookie', absolute=True)
}


class CookieListAPI(Resource):
    '''
    This handles listing collections.
    GET /cookies/api/v1.0/cookies for reading all cookies
    POST /cookies/api/v1.0/cookies for creates
    '''

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('cookie_name', type=str, location='json')
        self.reqparse.add_argument(
            'cookie_recipe_url', type=str, location='json')
        self.reqparse.add_argument('quantity', type=int, location='json')
        super(CookieListAPI, self).__init__()

    @marshal_with(cookie_fields)
    def get(self):
        return Cookie.query.all()

    @marshal_with(cookie_fields)
    def post(self):
        args = self.reqparse.parse_args()
        cookie = Cookie(
            cookie_name=args['cookie_name'],
            cookie_recipe_url=args['cookie_recipe_url'],
            quantity=args['quantity']
        )
        db.session.add(cookie)
        db.session.commit()
        return cookie


class CookieAPI(Resource):
    '''
    Handles single resource operations
    GET /v1.0/cookies/<int:cookie_id> for reads
    PUT /v1.0/cookies/<int:cookie_id> for updates
    DELETE /v1.0/cookies/<int:cookie_id> for deletes
    '''

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('cookie_name', type=str, location='json')
        self.reqparse.add_argument(
            'cookie_recipe_url', type=str, location='json')
        self.reqparse.add_argument('quantity', type=int, location='json')
        super(CookieAPI, self).__init__()

    @marshal_with(cookie_fields, envelope='cookie')
    def get(self, cookie_id):
        return Cookie.query.get_or_404(cookie_id)

    @marshal_with(cookie_fields, envelope='cookie')
    def put(self, cookie_id):
        cookie = Cookie.query.get_or_404(cookie_id)
        args = self.reqparse.parse_args()
        if args['cookie_name']:
            cookie.cookie_name = args['cookie_name']
        if args['cookie_recipe_url']:
            cookie.cookie_recipe_url = args['cookie_recipe_url']
        if args['quantity']:
            cookie.quantity = args['quantity']
        db.session.commit()
        return cookie

    def delete(self, cookie_id):
        db.session.delete(Cookie.query.get_or_404(cookie_id))
        db.session.commit()
        return {'result': True}
