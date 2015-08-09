# Template API

provides a template for building a flask-based API with a start to finish
implementation of the following RESTful API

cookie RESTful API
------------------

HTTP Method|URI|Action
-----|-----|-----
GET|http://api.testflask.local:5000/v1.0/cookies|Retrieve list of cookies
GET|http://api.testflask.local:5000/v1.0/cookies/[task_id]|Retrieve a cookie
POST|http://api.testflask.local:5000/v1.0/cookies|Create a new cookie
PUT|http://api.testflask.local:5000/v1.0/cookies/[task_id]|Update an existing cookie
DELETE|http://api.testflask.local:5000/v1.0/cookies/[task_id]|Delete a cookie

Instructions
------------

To get the development DB setup, run the following:

    ./manage.py db init
    ./manage.py db migrate
    ./manage.py db upgrade

This will setup the initial migration to track future changes to the models.

In the future, after making changes to the models, you need to run only the
migrate command followed by upgrade command.

The development DB is setup as a SQLITE DB file saved in /tmp/dev.db

Running local server
--------------------

To start the local development server, run the following:

    ./manage.py runserver

It is currently configured to run on testflask.local:5000 which requires an
entry in /etc/hosts for 127.0.0.1 to point to testflask.local

This was done to allow the subdomain to work properly in development since we
cannot use subdomains with localhost by default.
