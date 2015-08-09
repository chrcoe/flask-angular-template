# learning-flask

the flaskfilled branch is following the github:jasonamyers/flaskfilled repo
from the pyohio2015 talk

The goal is to use this repo to learn about flask and work on building an API
from scratch

cookie RESTful API
------------------

HTTP Method|URI|Action
-----|-----|-----
GET|http://api.testflask.local:5000/v1.0/cookies|Retrieve list of cookies
GET|http://api.testflask.local:5000/v1.0/cookies/[task_id]|Retrieve a cookie
POST|http://api.testflask.local:5000/v1.0/cookies|Create a new cookie
PUT|http://api.testflask.local:5000/v1.0/cookies/[task_id]|Update an existing cookie
DELETE|http://api.testflask.local:5000/v1.0/cookies/[task_id]|Delete a cookie
