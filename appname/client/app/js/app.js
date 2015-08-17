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
        .when('/', {
            // templateUrl: 'index-new.html',
            access: {
                restricted: false
            }
        })
        .when('/appname', {
            templateUrl: 'views/home/home.html',
            access: {
                restricted: true
            }
        })
        .when('/login', {
            templateUrl: 'components/auth/auth-login.html',
            controller: 'LoginCtrl',
            access: {
                restricted: false
            }
        })
        .when('/logout', {
            controller: 'LogoutCtrl',
            access: {
                restricted: false
            }
        })
        .when('/register', {
            templateUrl: 'components/auth/auth-register.html',
            controller: 'RegisterCtrl',
            access: {
                restricted: false
            }
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

myapp_module.run(function($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (next.access.restricted && AuthService.isLoggedIn() === false) {
            $location.path('/login');
            $route.reload();
        }
    });
});
