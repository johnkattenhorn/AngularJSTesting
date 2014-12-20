'use strict';

angular.module('patradingwebApp')
    .factory('MyTestRepository', function ($injector, MyTestModel) {
        var BaseRepository = $injector.get('BaseRepository');
        return new BaseRepository({name: 'MyTestRepository', model: MyTestModel});
    });