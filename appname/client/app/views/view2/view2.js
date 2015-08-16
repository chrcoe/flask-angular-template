'use strict';

angular.module('myApp.views.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view2', {
        templateUrl: 'views/view2/view2.html',
        controller: 'View2Ctrl',
        access: {
            restricted: true
        }
    });
}])

.controller('View2Ctrl', [function() {
    // fill in details here for the view2 controller
}]);
