'use strict';

var components = angular.module('patradingwebApp.components', []);
angular.componentFactory.moduleDecorator(components);

var app = angular.module('patradingwebApp', [
        'kennethlynne.componentFactory',
        'ngSymbiosis.utils',
        'ngSymbiosis.routeProvider',
        'ngSymbiosis.repository',
        'ngSymbiosis.model',
        'patradingwebApp.components',
        'ngAnimate',
        'ajoslin.promise-tracker',
        'cgBusy',
        'chieffancypants.loadingBar',
        'ui.router',
        'ui.bootstrap',
        'ngCookies',
        'ngResource',
        'restangular',
        'ngSanitize',
        'ngTouch',
        'ngStorage',
        'AdalAngular'
    ])
    .config([
        '$httpProvider', 'adalAuthenticationServiceProvider', function($httpProvider, $adalProvider) {
            $adalProvider.init({
                    tenant: 'applicita.onmicrosoft.com',
                    clientId: 'c2026abe-fe70-4478-a89e-ca07160f7f6a',
                    extraQueryParameter: 'nux=1'
                },
                $httpProvider
            );

        }
    ]);;

angular.componentFactory.moduleDecorator(app);