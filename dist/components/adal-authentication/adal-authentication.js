'use strict';

angular.module('patradingwebApp.components')
    .controller('adalAuthenticationComponentCtrl', 'adalAuthenticationService', function ($scope, $element, adalService) {
        $scope.text = 'this is the adalAuthentication component';

        $scope.signin = function () {
            adalService.login();
        };

        $scope.signOut = function () {
            adalService.logOut();
        };

        $scope.username = function () {
            if ($rootScope.userInfo) {
                return $rootScope.userInfo.Username;
            }

            return "";
        };

        $scope.signedIn = function() {
            return false;
        }
    })
    .component('adalAuthentication', function () {
        return {
            controller: 'adalAuthenticationComponentCtrl'
        };
    });
