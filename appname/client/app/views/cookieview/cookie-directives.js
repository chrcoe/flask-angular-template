// create a new module which is called as a dependency in the cookie controller
var cookie_module = angular.module('myApp.views.cookie.cookie-directives', []);

cookie_module.directive('cookieResult', function() {
    return {
        templateUrl: 'views/cookieview/cookieresult.html'
    };
});

cookie_module.directive('test', function() {
    return {
        template: 'i like cookies!'
    };
}

);
