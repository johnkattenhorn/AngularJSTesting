/// <reference path="my-test-mock.js" />
/// <reference path="my-test-mock.js" />
angular.module('patradingwebApp')
    .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape, guid) {
        if(!Config.API.useMocks) return;

        var collectionUrl = APIBaseUrl + 'my-tests';
        var IdRegExp = /[\d\w-_]+$/.toString().slice(1, -1);

        console.log('Stubbing my-test API - ' + collectionUrl);
        console.log('************');

        var MyTestRepo = {};

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/app/dev/' + 'my-test' + '-mock.json', false); // sync request
        xhr.send();
        MyTestRepo.data = JSON.parse(xhr.response);

        //MyTestRepo.data = [{id: guid(), text:'Hello World'}];
        MyTestRepo.index = {};

        angular.forEach(MyTestRepo.data, function(item, key) {
            MyTestRepo.index[item.id] = item;
        });

        //GET my-test/
        $httpBackend.whenGET(collectionUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to my-test', data);
            return [200, MyTestRepo.data, {/*headers*/}];
        });

        //POST my-test/
        $httpBackend.whenPOST(collectionUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted POST to my-test', data);
            var MyTest = angular.fromJson(data);

            MyTest.id = guid();
            MyTestRepo.data.push(MyTest);
            MyTestRepo.index[MyTest.id] = MyTest;

            return [200, MyTest, {/*headers*/}];
        });

        //GET my-test/id
        $httpBackend.whenGET( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to my-test');
            var id = url.match( new RegExp(IdRegExp) )[0];
            return [MyTestRepo.index[id]?200:404, MyTestRepo.index[id] || null, {/*headers*/}];
        });

        //PUT my-test/id
        $httpBackend.whenPUT( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted PUT to my-test');
            var id = url.match( new RegExp(IdRegExp) )[0];

            if (!MyTestRepo.index[id]) {
                return [404, {} , {/*headers*/}];
            }

            var MyTest = MyTestRepo.index[id] = angular.fromJson(data);

            return [200, MyTest, {/*headers*/}];
        });

        //DELETE my-test/id
        $httpBackend.whenDELETE( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted DELETE to my-test');
            var id = url.match( new RegExp(IdRegExp) )[0];

            var MyTest = MyTestRepo.index[id];
            if (!MyTest) {
                return [404, {} , {/*headers*/}];
            }
            delete MyTestRepo.index[MyTest.id];
            var index = MyTestRepo.data.indexOf(MyTest);
            MyTestRepo.data.splice(index, 1);
            return [200, MyTest , {/*headers*/}];
        });

    });


