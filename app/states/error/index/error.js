'use strict';

angular.module('patradingwebApp')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('error', stateFactory('Error', {
            url:'/error?code'
        }));
    })
    .controller('ErrorCtrl', function ($scope, $stateParams) {
        $scope.errorCode = $stateParams.code;
    });
