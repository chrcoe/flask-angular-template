from api.resources import CookieAPI, CookieListAPI


def init(api):
    ''' Initialize endpoints for the API object provided. '''

    # set entry points
    api.add_resource(
        CookieListAPI, '/v1.0/cookies',
        endpoint='cookies', subdomain='api'
    )
    api.add_resource(
        CookieAPI, '/v1.0/cookies/<int:cookie_id>',
        endpoint='cookie', subdomain='api'
    )
