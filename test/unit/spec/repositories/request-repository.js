describe('Model Repository: RequestRepository', function () {

    var RequestRepository, $httpBackend, Model, $rootScope, BaseRepository;

    beforeEach(function () {

        Model = function (p) {
            this.id = p.id;
        };

        Model.$settings = {
            url: 'URL'
        };

        module('patradingwebApp', function ($provide) {
            $provide.value('RequestModel', Model);
        });

        inject(function (_RequestRepository_, _$httpBackend_, _$rootScope_, $injector) {
            RequestRepository = _RequestRepository_;
            $httpBackend = _$httpBackend_;
            BaseRepository = $injector.get('BaseRepository');
            $rootScope = _$rootScope_;
        });

    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be an instance of BaseRepository', function() {
        expect(RequestRepository instanceof BaseRepository).toBeTruthy();
    });

    describe('getById', function () {
        it('should return models by id', function() {
            $httpBackend.expectGET(Model.$settings.url + '/5').respond(200, {id: 5});

            var promise = RequestRepository.getById(5);

            var response;
            promise.then(function (r) {
                response = r;
            });

            $httpBackend.flush();

            expect(response instanceof Model).toBeTruthy();
            expect(response.id).toEqual(5);
        });

        it('should not do subsequent calls if model already exits in pool', function() {
            $httpBackend.expectGET(Model.$settings.url + '/5').respond(200, {id: 5});
            RequestRepository.getById(5);
            $httpBackend.flush();

            var promise = RequestRepository.getById(5);

            var response;
            promise.then(function (r) {
                response = r;
            });

            $rootScope.$digest();

            expect(response instanceof Model).toBeTruthy();
            expect(response.id).toEqual(5);
        });

        it('should handle rejects', function() {
            $httpBackend.expectGET(Model.$settings.url + '/5').respond(404, 'No such thang!');

            var promise = RequestRepository.getById(5),
                response,
                success = jasmine.createSpy('success'),
                error = jasmine.createSpy('error');

            promise.then(success).catch(error);

            $httpBackend.flush();

            expect(success).not.toHaveBeenCalled();
            expect(error).toHaveBeenCalled();
        });
    });

    describe('getAll', function () {
        it('should return models by id', function() {
            $httpBackend.expectGET(Model.$settings.url).respond(200, [{id: 5},{id: 6}]);

            var promise = RequestRepository.getAll();

            var Request5, Request6;
            promise.then(function (r) {
                Request5 = r[0];
                Request6 = r[1];
            });

            $httpBackend.flush();

            expect(Request5 instanceof Model).toBeTruthy();
            expect(Request5.id).toEqual(5);

            expect(Request6 instanceof Model).toBeTruthy();
            expect(Request6.id).toEqual(6);
        });

        it('should handle rejects', function() {
            $httpBackend.expectGET(Model.$settings.url).respond(404, 'No such thang!');

            var promise = RequestRepository.getAll(5),
                success = jasmine.createSpy('success'),
                error = jasmine.createSpy('error');

            promise.then(success).catch(error);

            $httpBackend.flush();

            expect(success).not.toHaveBeenCalled();
            expect(error).toHaveBeenCalled();
        });
    });

    describe('attach', function () {

        it('should throw if trying to attach a model that is not of valid type', function() {
            function wrapper() {
                RequestRepository.attach({fails: true});
            }
            expect(wrapper).toThrow();
        });

        it('should return the attached model on subsequent requests', function() {

            RequestRepository.attach(new Model({id: 5}));

            var Request;

            RequestRepository.getById(5).then(function (response) {
                Request = response;
            });

            $rootScope.$digest();

            expect(Request instanceof Model).toBeTruthy();
            expect(Request.id).toEqual(5);
        });
    });

    describe('create', function () {
        it('should return a newed up instance of the Request Model', function() {
            var Request = RequestRepository.create({title:'New title'});
            expect(Request instanceof Model).toBeTruthy();
        });
    });

    describe('cache', function () {
        it('should return a reference to the pool', function() {
            var newRequest = {id:19};
            RequestRepository.cache[19] = newRequest;

            var Request;
            RequestRepository.getById(19).then(function (response) {
                Request = response;
            });
            $rootScope.$digest();

            expect(Request).toBe(newRequest);
        });
    });

    describe('saveChanges', function () {
       it('should save all changes in current Repository to the server');
    });
});