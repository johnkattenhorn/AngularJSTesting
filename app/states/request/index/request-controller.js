'use strict';

angular.module('patradingwebApp')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('request', stateFactory('Request', {
            url: '/request',
            templateUrl: 'states/request/index/main-view.html',
            requireADLogin: true,
            resolve: {
                //help ng-min & ng-annotate out
                modelPromise: ['RequestRepository', function (RequestRepository) {
                    return RequestRepository.getAll();
                }]
            }
        }));
    })
    .controller('RequestCtrl', function ($scope) {
        $scope.foo = 'bar';
    });
