'use strict';

var cookie_module = angular.module('myApp.views.cookie', [
    'ngRoute',
    'myApp.views.cookie.cookie-directives'
]);

cookie_module.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/appname/cookie', { // setup the URL we want to use
                templateUrl: 'views/cookieview/cookieview.html', // load this template
                controller: 'CookieCtrl', // and this controller ...
                access: {
                    restricted: true
                } // restrict access to authenticated users only
            });
        // this is setting the authentication headers for all Cookie-related
        // API requests .. this can be done in the global app.js setup as well:
        // https://docs.angularjs.org/api/ng/service/$http
        $httpProvider.defaults.headers.common[
                // special API account for this application .. users still need to be
                // logged in to get to the view which provides access to the cookie ctrl
                'Authorization'] = 'Basic dGVzdDp0ZXN0'
            // obviously this is hardcoded and would not be very secure, need
            // to pull this from an environment variable or config file that is
            // NEVER saved to github
    }
]);

// TODO: need to figure out getting the token from a GET api.xyz/token HTTP call
// then passing this in each controller until it expires, then get another token
// .. that way the user logs in only once and then it is all tokens from there.
//
// the GET /token call can happen upon first login, then again every time the
// token expires

// the problem here is that to access a protected resource from an API, there
// are two parts, the first is to login to the front end
// the second is to use a token for all API calls from there on out until the
// user logs out...

cookie_module.controller('CookieCtrl', ['$scope', '$log', '$http',
    function($scope, $log, $http) {

        $scope.create = function(cookie) {
            var cookie_name = $scope.cookie.cookie_name;
            var cookie_recipe_url = $scope.cookie.cookie_recipe_url;
            var quantity = $scope.cookie.quantity;
            var url = 'http://api.testflask.local:5000/v1.0/cookies'
                // need to add the APIkey to the request ...
                // fire the API request
            $http.post(url, {
                "cookie_name": cookie_name,
                "cookie_recipe_url": cookie_recipe_url,
                "quantity": quantity,
            }).
            then(function(results) {
                $log.log(results.data.cookie);
                $scope.cookie_result = results.data.cookie;
                $log.log($scope.cookie_result);
                $scope.msg = "Cookie created!";
            }).
            catch(function(error) {
                $scope.cookie_result = null;
                $scope.msg = "Cookie not found!";
                $log.log(error);
            });
            $scope.cookie = null;
        };

        $scope.retrieve = function(cookie) {
            $log.log("entered $scope.retrieve()");
            var cookie_id = $scope.cookie.cookie_id;
            // fire the API request
            var url = 'http://api.testflask.local:5000/v1.0/cookies/{x}'.replace('{x}', cookie_id);
            $log.log(url)
            $http.get(url).
            then(function(results) {
                $log.log(results.data.cookie);
                $scope.cookie_result = results.data.cookie;
                $scope.msg = "Cookie found!";
            }).
            catch(function(error) {
                $scope.cookie_result = null;
                $scope.msg = "Cookie not found!";
                $log.log(error);
            });
            $scope.cookie = null;
        };

        $scope.update = function(cookie) {
            $log.log("entered $scope.retrieve()");
            var cookie_id = $scope.cookie.cookie_id;
            var cookie_name = $scope.cookie.cookie_name;
            var cookie_recipe_url = $scope.cookie.cookie_recipe_url;
            var quantity = $scope.cookie.quantity;
            // fire the API request
            var url = 'http://api.testflask.local:5000/v1.0/cookies/{x}'.replace('{x}', cookie_id);
            $log.log(url)
            $http.put(url, {
                "cookie_name": cookie_name,
                "cookie_recipe_url": cookie_recipe_url,
                "quantity": quantity,
            }).
            then(function(results) {
                $log.log(results.data.cookie);
                $scope.cookie_result = results.data.cookie;
                $scope.msg = "Cookie updated!";
            }).
            catch(function(error) {
                $scope.cookie_result = null;
                $scope.msg = "Cookie not found!";
                $log.log(error);
            });
            $scope.cookie = null;
        };

        $scope.delete = function(cookie) {
            $log.log("entered $scope.delete()");
            var cookie_id = $scope.cookie.cookie_id;
            // fire the API request
            var url = 'http://api.testflask.local:5000/v1.0/cookies/{x}'.replace('{x}', cookie_id);
            $log.log(url)
            $http.delete(url).
            then(function(results) {
                $log.log(results.data);
                $scope.cookie_result = null;
                $scope.msg = "Cookie deleted!";
            }).
            catch(function(error) {
                $scope.msg = "Cookie not found!";
                $log.log(error);
            });
            $scope.cookie_result = null;
            $scope.cookie = null;
        };

    }
]);
