'use strict';

angular.module('patradingwebApp')
    .config(function ($urlRouterProvider) {
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise("/app/error?code=404");
    });
