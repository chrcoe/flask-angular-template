'use strict';

angular.module('myApp.views.cookieview', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/cookieview', { // setup the URL we want to use
        templateUrl: 'views/cookieview/cookieview.html', // load this template
        controller: 'CookieViewCtrl' // and this controller ...
    });
}])

.controller('CookieViewCtrl', ['$scope', '$log', '$http', function($scope, $log, $http) {

    $scope.create = function(cookie) {
        var cookie_name = $scope.cookie.cookie_name;
        var cookie_recipe_url = $scope.cookie.cookie_recipe_url;
        var quantity = $scope.cookie.quantity;
        // fire the API request
        $http.post('http://api.testflask.local:5000/v1.0/cookies', {
            "cookie_name": cookie_name,
            "cookie_recipe_url": cookie_recipe_url,
            "quantity": quantity,
        }).
        success(function(results) {
            $log.log(results);
            $scope.cookie_result = results.cookie;
            $scope.msg = "Cookie created!";
        }).
        error(function(error) {
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
        success(function(results) {
            $log.log(results);
            $scope.cookie_result = results.cookie;
            $scope.msg = "Cookie found!";
        }).
        error(function(error) {
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
        success(function(results) {
            $log.log(results);
            $scope.cookie_result = results.cookie;
            $scope.msg = "Cookie updated!";
        }).
        error(function(error) {
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
        success(function(results) {
            $log.log(results);
            $scope.cookie_result = null;
            $scope.msg = "Cookie deleted!";
        }).
        error(function(error) {
            $scope.msg = "Cookie not found!";
            $log.log(error);
        });
        $scope.cookie_result = null;
        $scope.cookie = null;
    };

}]);
