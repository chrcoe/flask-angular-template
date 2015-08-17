'use strict';

var auth_module = angular.module('myApp.auth', []);

auth_module.factory('AuthService', ['$q', '$timeout', '$http',
    function($q, $timeout, $http) {

        console.log("in AuthService factory definition");

        // create user variable
        var user = null;

        function isLoggedIn() {
            console.log("checking logged in status...");
            if (user) {
                return true;
            } else {
                return false;
            }
        }

        function login(username, apiKey) {
            console.log("in AuthService.login(username, apiKey)");
            // create a new instance of deferred
            var deferred = $q.defer();
            // send a post request to the server
            $http.post('http://api.testflask.local:5000/login', {
                    username: username,
                    api_key: apiKey
                })
                // handle success
                .success(function(data, status) {
                    if (status === 200 && data.result) {
                        user = true;
                        deferred.resolve();
                    } else {
                        user = false;
                        deferred.reject();
                    }
                })
                // handle error
                .error(function(data) {
                    user = false;
                    deferred.reject();
                });
            // return promise object
            return deferred.promise;
        }

        function logout() {
            console.log("in AuthService.logout()");
            // create a new instance of deferred
            var deferred = $q.defer();
            // send a get request to the server
            $http.get('http://api.testflask.local:5000/logout')
                // handle success
                .success(function(data) {
                    user = false;
                    deferred.resolve();
                })
                // handle error
                .error(function(data) {
                    user = false;
                    deferred.reject();
                });
            // return promise object
            return deferred.promise;
        }

        function register(username, password) {
            // create a new instance of deferred
            var deferred = $q.defer();
            // send a post request to the server
            $http.post('http://api.testflask.local:5000/register', {
                    username: username,
                    password: password
                })
                // handle success
                .success(function(data, status) {
                    if (status === 200 && data.result) {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                })
                // handle error
                .error(function(data) {
                    deferred.reject();
                });
            // return promise object
            return deferred.promise;
        }

        // return available functions for use in controllers
        return ({
            isLoggedIn: isLoggedIn,
            login: login,
            logout: logout,
            register: register
        });
    }
]);
