from api import db

# pylint:disable=R0903


class Cookie(db.Model):
    __tablename__ = 'cookies'

    cookie_id = db.Column(db.Integer(), primary_key=True)
    cookie_name = db.Column(db.String(50), index=True)
    cookie_recipe_url = db.Column(db.String(255))
    quantity = db.Column(db.Integer())

    def __init__(self, cookie_name=None, cookie_recipe_url=None, quantity=0):
        self.cookie_name = cookie_name
        self.cookie_recipe_url = cookie_recipe_url
        self.quantity = quantity
