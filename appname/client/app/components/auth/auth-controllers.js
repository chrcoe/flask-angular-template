'use strict';

// uses the auth module created in auth-services.js
var auth_module = angular.module('myApp.auth');

auth_module.controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'AuthService',
    function($rootScope, $scope, $location, AuthService) {

        console.log("in LoginCtrl.login()");
        console.log("Logged in?: " + AuthService.isLoggedIn());

        $scope.login = function() {

            // initial values
            $scope.error = false;
            $scope.disabled = true;
            $rootScope.userLoggedIn = false;

            // call login from service
            AuthService.login($scope.loginForm.username, $scope.loginForm.password)
                // handle success
                .then(function() {
                    // after successful login goto the main page...
                    $location.path('/');
                    $scope.disabled = false;
                    $scope.loginForm = {};
                    $rootScope.userLoggedIn = true;
                })
                // handle error
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid username and/or password";
                    $scope.disabled = false;
                    $scope.loginForm = {};
                    $rootScope.userLoggedIn = false;
                });

        };

    }
]);


auth_module.controller('LogoutCtrl', ['$rootScope', '$scope', '$location', 'AuthService',
    function($rootScope, $scope, $location, AuthService) {

        $scope.logout = function() {

            console.log(AuthService.isLoggedIn());

            // call logout from service and redirect to /login when finished
            console.log(AuthService.isLoggedIn());
            AuthService.logout()
                .then(function() {
                    $rootScope.userLoggedIn = false;
                    $location.path('/');
                });

        };

    }
]);

auth_module.controller('RegisterCtrl', ['$rootScope', '$scope', '$location', 'AuthService',
    function($rootScope, $scope, $location, AuthService) {

        $scope.register = function() {

            // initial values
            $scope.error = false;
            $scope.disabled = true;
            $rootScope.userLoggedIn = false;

            // call register from service
            AuthService.register($scope.registerForm.username, $scope.registerForm.password)
                // handle success
                .then(function() {
                    $location.path('/login');
                    $scope.disabled = false;
                    $scope.registerForm = {};
                })
                // handle error
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Something went wrong! That username already exists.";
                    $scope.disabled = false;
                    $scope.registerForm = {};
                });

        };

    }
]);
