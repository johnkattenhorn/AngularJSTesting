'use strict';

angular.module('patradingwebApp')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('index', stateFactory('Index', {
      url:'/',
      resolve: {
        //help ng-min & ng-annotate out
        modelPromise: ['MyTestRepository',function(MyTestRepository){
          return MyTestRepository.getAll();
        }]
      }
    }));
  })
  .controller('IndexCtrl', function ($scope, modelPromise) {
    $scope.title = 'Welcome';
    console.log('first item text from modelPromise', modelPromise[0].text);
  });
