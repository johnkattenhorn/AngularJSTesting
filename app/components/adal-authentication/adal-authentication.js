'use strict';

angular.module('patradingwebApp.components')
    .controller('adalAuthenticationComponentCtrl', ['$rootScope', '$scope', '$element', 'adalAuthenticationService', function ($rootScope,$scope, $element, adalService) {

        $scope.user = $rootScope.userInfo;
    
        $scope.signIn = function () {
            adalService.login();
        };

        $scope.signOut = function () {
            adalService.logOut();
        };

        $rootScope.$on("adal:loginSuccess", function () {
            $scope.testMessage = "loginSuccess";

            $scope.isAuthenticated = true;
            $scope.userName = $rootScope.userInfo.userName;
        });

        // optional
        $rootScope.$on("adal:loginFailure", function () {
            $scope.testMessage = "loginFailure";
            $location.path("/Index");
        });

        // optional
        $rootScope.$on("adal:notAuthorized", function (event, rejection, forResource) {
            $scope.testMessage = "It is not Authorized for resource:" + forResource;
        });
        
    }])
    .component('adalAuthentication', function () {
        return {
            controller: 'adalAuthenticationComponentCtrl'
        };
    });