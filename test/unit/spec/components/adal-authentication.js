'use strict';

describe('Component: adalAuthenticationComponent', function () {

    describe('Directive: adalAuthenticationComponent', function () {
        var element, scope, $compile;

        beforeEach(function () {

            module('argentierepatradingwebApp');

            inject(function ($rootScope, _$compile_) {
                scope = $rootScope.$new();
                $compile = _$compile_;
            });

        });

        it('should have the component class', function() {
            element = angular.element('<adal-authentication-component></adal-authentication-component>');
            element = $compile(element)(scope);
            scope.$digest();
            expect(element).toHaveClass('adal-authentication-component');
        });

        it('should render text', function() {
            element = angular.element('<adal-authentication-component></adal-authentication-component>');
            element = $compile(element)(scope);
            scope.$digest();
            expect(element.text()).toContain('adalAuthentication');
        });

    });

    describe('Controller: adalAuthenticationComponentCtrl', function () {

        var Ctrl, scope, element;

        beforeEach(function () {

            module('argentierepatradingwebApp');

            inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                element = angular.element('<adal-authentication-component></adal-authentication-component>');
                Ctrl = $controller('adalAuthenticationComponentCtrl', {
                    $scope: scope,
                    $element: element
                });
            });
        });

        it('should render a message', function () {
            expect(scope.text).toEqual('this is the adalAuthentication component');
        });
    });

});