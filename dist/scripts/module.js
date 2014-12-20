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
]);
angular.componentFactory.moduleDecorator(app);