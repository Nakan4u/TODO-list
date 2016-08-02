describe('MainController', function () {
    var scope,
        MainCtrl;

    beforeEach(module('myApp'));

    beforeEach(inject(function (_$controller_, _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_.$new();

        localStorage.clear();
        scope = {};
        MainCtrl = $controller('MainController', { $scope: scope });
    }));


    it('should create a `contacts` model with 2 contacts by default', function () {
        expect(scope.callList.length).toBe(2);
    });

    it('method updateData should set `contacts` model to local storage', function () {
        var localStorageData;

        MainCtrl.updateData();
        localStorageData = localStorage.getItem('list');

        expect(angular.fromJson(localStorageData).length).toBe(2);
    });

    it('method saveData should change `contacts` model by add 1 new contact', function () {
        var newContact = {
            name: 'John',
            phone: '+(420) 121 242 333',
            time: 1288323623002
        };
        MainCtrl.saveData(newContact);

        expect(scope.callList.length).toBe(3);
    });

    it('method removeItem should change `contacts` model by remove 1 contacts', function () {
        MainCtrl.removeItem(1288323623006);

        expect(scope.callList.length).toBe(1);
    });

    describe('method nextCall', function () {
        it('should find contact in `contacts` if new contact will be in future', function () {
            var currentTime = new Date().getTime(),
                futureTime = currentTime + 60000, //one minute in future
                newContact = {
                    name: 'Jim',
                    phone: '+(420) 121 242 333',
                    time: futureTime
                };
            scope.callList.push(newContact);

            MainCtrl.findNextCall();

            expect(scope.nextCall.name).toBe('Jim');
        });

        it('should not find contact in `contacts` if all contacts in the past', function () {
            MainCtrl.findNextCall();

            expect(scope.nextCall).not.toBeDefined();
        });
    });

});