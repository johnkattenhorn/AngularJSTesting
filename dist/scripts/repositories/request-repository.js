'use strict';

angular.module('patradingwebApp')
    .factory('RequestRepository', function ($injector, RequestModel) {
        var BaseRepository = $injector.get('BaseRepository');
        return new BaseRepository({name: 'RequestRepository', model: RequestModel});
    });