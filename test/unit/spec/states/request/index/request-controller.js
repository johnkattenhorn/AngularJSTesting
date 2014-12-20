'use strict';

describe('Controller(/request): RequestCtrl', function () {

    var Request, scope;

    beforeEach(function () {

        module('patradingwebApp');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            Request = $controller('RequestCtrl', {
                $scope: scope
            });
        });
    });

    it('should attach init data to scope', function () {
        expect(scope.foo).toEqual('bar');
    });
});

