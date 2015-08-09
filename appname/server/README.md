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
