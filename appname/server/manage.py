#! /usr/bin/env python
import os

from flask.ext.script import Manager, Shell, Command, Server
from flask.ext.migrate import Migrate, MigrateCommand

from api import create_app, db
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

manager.add_command('runserver', Server(host='testflask.local', port=5000))
manager.add_command('shell', Shell(make_context=make_shell_context))
# manager.add_command('db_init', DBInit(db))
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
