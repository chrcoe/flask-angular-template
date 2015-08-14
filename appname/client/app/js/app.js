'use strict';

// Declare app level module which depends on views, and components
var myapp_module = angular.module('myApp', [
    'ngRoute',
    'myApp.views.cookie',
    'myApp.views.view2',
    'myApp.version',
    'myApp.auth',
]);
myapp_module.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/login', {
            templateUrl: 'components/auth/auth.html',
            controller: 'LoginCtrl'
        })
        // .when('/logout', {
        // controller: 'LogoutCtrl'
        // })
        // .when('/register', {
        // templateUrl: 'static/partials/register.html',
        // controller: 'registerController'
        // })
        .otherwise({
            redirectTo: '/'
        });
}]);
