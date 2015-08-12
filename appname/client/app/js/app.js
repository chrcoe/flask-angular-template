'use strict';

// Declare app level module which depends on views, and components
var myapp_module = angular.module('myApp', [
    'ngRoute',
    'myApp.views.cookie',
    'myApp.views.view2',
    'myApp.version',
    'myApp.auth'
]);
myapp_module.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/cookie'
    });
}]);
