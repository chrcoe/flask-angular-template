#! /usr/bin/env python
import os
from flask import request, jsonify, session
from flask.ext.script import Manager, Shell, Command, Server
from flask.ext.migrate import Migrate, MigrateCommand
from flask.ext.login import login_required

from api import create_app, db
from api.models import User
# from . import create_app, db

app = create_app(os.getenv('FLASK_CONFIG') or 'default')
manager = Manager(app)
migrate = Migrate(app, db)


def make_shell_context():
    return dict(app=app, db=db)


class DBInit(Command):
    ''' Creates tables from SQLAlchemy models. '''

    def __init__(self, db):
        self.db = db

    def run(self):
        self.db.create_all()


class DBRegUser(Command):
    ''' Creates a regular user in the DB. '''

    def __init__(self, db):
        self.db = db

    def run(self):
        user = User(username='test')
        user.password = 'test'
        self.db.session.add(user)
        self.db.session.commit()


class DBAPIUser(Command):
    ''' Creates an API user in the DB. '''

    def __init__(self, db):
        self.db = db

    def run(self):
        api_user = User(username='testapi')
        api_user.password = 'testapi'
        api_user.api_key = 'api_key'
        self.db.session.add(api_user)
        self.db.session.commit()


@app.route('/login', methods=['POST'], subdomain='api')
def login():
    json_data = request.json
    user = User.query.filter_by(username=json_data['username']).first()
    # if user and user.verify_password(json_data.get('password', '')) \
    if user and user.verify_api_key(json_data.get('api_key', '')):
        session['logged_in'] = True
        status = True
        print('user logged in!')
    else:
        status = False
        print('user failed to authenticate!:\t{}:{}'.format(
            json_data['username'], json_data['api_key']))
    return jsonify(result=status)


@app.route('/logout', subdomain='api')
@login_required
def logout():
    session.pop('logged_in', None)
    return jsonify(result=True)


@app.route('/register', methods=['POST'], subdomain='api')
def register():
    json_data = request.json
    user = User(
        username=json_data['username'],
        password=json_data['password']
    )
    try:
        db.session.add(user)
        db.session.commit()
        # status = 'success'
        status = True
        print('successfully registered user:\t{}'.format(json_data['username']))
    except:
        # status = 'this user is already registered'
        status = False
    db.session.close()
    return jsonify(result=status)

manager.add_command('runserver', Server(host='testflask.local', port=5000))
manager.add_command('shell', Shell(make_context=make_shell_context))
manager.add_command('db_create_reg_user', DBRegUser(db))
manager.add_command('db_create_api_user', DBAPIUser(db))
# manager.add_command('db_init', DBInit(db))
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
