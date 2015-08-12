var auth_module = angular.module('myApp.auth', []);


auth_module.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    // .when('/', {
    // templateUrl: 'static/partials/home.html'
    // })
        .when('/login', {
            templateUrl: 'components/auth/auth.html',
            controller: 'loginController'
        })
        .when('/logout', {
            controller: 'logoutController'
        })
        // .when('/register', {
        // templateUrl: 'static/partials/register.html',
        // controller: 'registerController'
        // })
        // .when('/one', {
        // template: '<h1>This is page one!</h1>'
        // })
        // .when('/two', {
        // template: '<h1>This is page two!</h1>'
        // })
        .otherwise({
            redirectTo: '/cookie'
        });
}]);

auth_module.controller('loginController', ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {

        console.log(AuthService.isLoggedIn());

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


auth_module.controller('logoutController', ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {

        $scope.logout = function() {

            console.log(AuthService.isLoggedIn());

            // call logout from service
            AuthService.logout()
                .then(function() {
                    $location.path('/login');
                });

        };

    }
]);
