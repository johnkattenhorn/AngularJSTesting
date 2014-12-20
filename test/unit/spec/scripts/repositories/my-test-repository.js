describe('Model Repository: MyTestRepository', function () {

    var MyTestRepository, $httpBackend, Model, $rootScope, BaseRepository;

    beforeEach(function () {

        Model = function (p) {
            this.id = p.id;
        };

        Model.$settings = {
            url: 'URL'
        };

        module('patradingwebApp', function ($provide) {
            $provide.value('MyTestModel', Model);
        });

        inject(function (_MyTestRepository_, _$httpBackend_, _$rootScope_, $injector) {
            MyTestRepository = _MyTestRepository_;
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
        expect(MyTestRepository instanceof BaseRepository).toBeTruthy();
    });

    describe('getById', function () {
        it('should return models by id', function() {
            $httpBackend.expectGET(Model.$settings.url + '/5').respond(200, {id: 5});

            var promise = MyTestRepository.getById(5);

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
            MyTestRepository.getById(5);
            $httpBackend.flush();

            var promise = MyTestRepository.getById(5);

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

            var promise = MyTestRepository.getById(5),
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

            var promise = MyTestRepository.getAll();

            var MyTest5, MyTest6;
            promise.then(function (r) {
                MyTest5 = r[0];
                MyTest6 = r[1];
            });

            $httpBackend.flush();

            expect(MyTest5 instanceof Model).toBeTruthy();
            expect(MyTest5.id).toEqual(5);

            expect(MyTest6 instanceof Model).toBeTruthy();
            expect(MyTest6.id).toEqual(6);
        });

        it('should handle rejects', function() {
            $httpBackend.expectGET(Model.$settings.url).respond(404, 'No such thang!');

            var promise = MyTestRepository.getAll(5),
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
                MyTestRepository.attach({fails: true});
            }
            expect(wrapper).toThrow();
        });

        it('should return the attached model on subsequent requests', function() {

            MyTestRepository.attach(new Model({id: 5}));

            var MyTest;

            MyTestRepository.getById(5).then(function (response) {
                MyTest = response;
            });

            $rootScope.$digest();

            expect(MyTest instanceof Model).toBeTruthy();
            expect(MyTest.id).toEqual(5);
        });
    });

    describe('create', function () {
        it('should return a newed up instance of the MyTest Model', function() {
            var MyTest = MyTestRepository.create({title:'New title'});
            expect(MyTest instanceof Model).toBeTruthy();
        });
    });

    describe('cache', function () {
        it('should return a reference to the pool', function() {
            var newMyTest = {id:19};
            MyTestRepository.cache[19] = newMyTest;

            var MyTest;
            MyTestRepository.getById(19).then(function (response) {
                MyTest = response;
            });
            $rootScope.$digest();

            expect(MyTest).toBe(newMyTest);
        });
    });

    describe('saveChanges', function () {
       it('should save all changes in current Repository to the server');
    });
});