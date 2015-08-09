'use strict';

describe('myApp.views.cookieview module', function() {

    beforeEach(module('myApp.views.cookieview'));

    describe('cookieview controller', function(){

        it('should be defined', inject(function($controller, $rootScope, $log, $http) {
            //spec body
            var cookeViewCtrl = $controller('CookieViewCtrl', {
                '$scope': $rootScope.$new(),
                '$log': $log,
                '$http': $http
            });
            expect(cookeViewCtrl).toBeDefined();
        }));

    });
});
