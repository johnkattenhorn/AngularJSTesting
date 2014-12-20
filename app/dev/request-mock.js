angular.module('patradingwebApp')
    .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape, guid) {
        if(!Config.API.useMocks) return;

        var collectionUrl = APIBaseUrl + 'requests';
        var IdRegExp = /[\d\w-_]+$/.toString().slice(1, -1);

        console.log('Stubbing request API - ' + collectionUrl);
        console.log('************');

        var RequestRepo = {};

        var xhr = new XMLHttpRequest();
        xhr.open('GET', './dev/' + 'request' + '-mock.json', false); // sync request
        xhr.send();
        RequestRepo.data = JSON.parse(xhr.response);

        //RequestRepo.data = [{id: guid(), text:'Hello World'}];
        RequestRepo.index = {};

        angular.forEach(RequestRepo.data, function(item, key) {
            RequestRepo.index[item.id] = item;
        });

        //GET request/
        $httpBackend.whenGET(collectionUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to request', data);
            return [200, RequestRepo.data, {/*headers*/}];
        });

        //POST request/
        $httpBackend.whenPOST(collectionUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted POST to request', data);
            var Request = angular.fromJson(data);

            Request.id = guid();
            RequestRepo.data.push(Request);
            RequestRepo.index[Request.id] = Request;

            return [200, Request, {/*headers*/}];
        });

        //GET request/id
        $httpBackend.whenGET( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to request');
            var id = url.match( new RegExp(IdRegExp) )[0];
            return [RequestRepo.index[id]?200:404, RequestRepo.index[id] || null, {/*headers*/}];
        });

        //PUT request/id
        $httpBackend.whenPUT( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted PUT to request');
            var id = url.match( new RegExp(IdRegExp) )[0];

            if (!RequestRepo.index[id]) {
                return [404, {} , {/*headers*/}];
            }

            var Request = RequestRepo.index[id] = angular.fromJson(data);

            return [200, Request, {/*headers*/}];
        });

        //DELETE request/id
        $httpBackend.whenDELETE( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted DELETE to request');
            var id = url.match( new RegExp(IdRegExp) )[0];

            var Request = RequestRepo.index[id];
            if (!Request) {
                return [404, {} , {/*headers*/}];
            }
            delete RequestRepo.index[Request.id];
            var index = RequestRepo.data.indexOf(Request);
            RequestRepo.data.splice(index, 1);
            return [200, Request , {/*headers*/}];
        });

    });


