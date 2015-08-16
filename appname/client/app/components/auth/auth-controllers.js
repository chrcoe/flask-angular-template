'use strict';

// uses the auth module created in auth-services.js
var auth_module = angular.module('myApp.auth');

auth_module.controller('LoginCtrl', ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {

        console.log("in LoginCtrl.login()");
        console.log("Logged in?: " + AuthService.isLoggedIn());

        $scope.login = function() {

            // initial values
            $scope.error = false;
            $scope.disabled = true;

            // call login from service
            AuthService.login($scope.loginForm.email, $scope.loginForm.password)
                // handle success
                .then(function() {
                    $location.path('/');
                    $scope.disabled = false;
                    $scope.loginForm = {};
                })
                // handle error
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid username and/or password";
                    $scope.disabled = false;
                    $scope.loginForm = {};
                });

        };

    }
]);


auth_module.controller('LogoutCtrl', ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {

        $scope.logout = function() {

            console.log(AuthService.isLoggedIn());

            // call logout from service and redirect to /login when finished
            console.log(AuthService.isLoggedIn());
            AuthService.logout()
                .then(function() {
                    $location.path('/login');
                });

        };

    }
]);
