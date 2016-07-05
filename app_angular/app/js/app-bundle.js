// set angular module and dependency
angular
    .module('myApp', ['ui.bootstrap', 'ui.bootstrap.datetimepicker'])
    .constant('CONSTS', {
        TIMEFILTER: {
            ALL: 0,
            FINISHED: 1,
            NEXT: 2
        }
    });



(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('MainController', MainController)
        
        MainController.$inject = ['$scope']
        function MainController($scope) {

            var vm = this;
            $scope.nextCall = {};
            $scope.callList = [
                {
                    name: 'Sam Tailor',
                    phone: '00420 121 242 343',
                    time: 1288323623006
                },
                {
                    name: 'Tom Henks',
                    phone: '00420 121 242 555',
                    time: 1248329626002
                }
            ];
            vm.render = function () {
                var localData = localStorage.getItem('list');
                if (localData) {
                    $scope.callList = angular.fromJson(localData);
                    vm.findNextCall();
                }
            }
            vm.saveData = function (entry) {
                $scope.callList.push(entry);
                vm.updateData();
            }
            vm.removeItem = function (time) {
                // remove by time becouse it is unique for each data item
                _.remove($scope.callList, { 'time': time });
                vm.updateData();
            };
            vm.updateData = function () {
                localStorage.setItem('list', angular.toJson($scope.callList));
                vm.findNextCall();
            }
            vm.findNextCall = function () {
                var allData = $scope.callList,
                    result,
                    currentTime = new Date().getTime();

                result = _.sortBy(allData, 'time'); // firstly sort all data by time
                result = _.find(result, function (item) {  // then find first near future item
                    return item.time >= currentTime;
                });

                $scope.nextCall = result;
            }

            // init app
            vm.render();
        }

})();
(function () {
    'use strict';

    angular
        .module('myApp')
        .directive('addCallForm', addCallForm);
        
        function addCallForm() {
            return {
                restrict: 'E',
                templateUrl: 'js/directives/addCall/tpl.html',
                controller: 'MainController',
                link: function ($scope, element, attrs, ctrl) {
                    $scope.name = '';
                    $scope.nameMaxLength = 30;
                    $scope.phone = '';
                    $scope.phonePattern = '(\\+|00)(\\(?\\d{3}\\)?-?)(\\s?\\d{3}){3}';

                    // timePicker params
                    $scope.time = '';
                    $scope.timePickerIsOpen = false;
                    $scope.timePattern = '([01]\\d|2[0-3]):?([0-5]\\d)';
                    $scope.timeOptions = {
                        readonlyInput: false,
                        showMeridian: false
                    };
                    $scope.openCalendar = function () {
                        $scope.timePickerIsOpen = true;
                    };
                    //end timePicker params

                    $scope.addCall = function () {
                        var newCall = {};

                        if ($scope.name && $scope.phone && $scope.time) {

                            $scope.phone = $scope.convertPhone($scope.phone);

                            newCall = {
                                name: $scope.name,
                                phone: $scope.phone,
                                time: $scope.time.getTime() //parse date to store in miliseconds
                            }
                            ctrl.saveData(newCall);
                            $scope.reset();
                        }
                    }

                    $scope.reset = function () {
                        //reset fields data
                        $scope.name = '';
                        $scope.phone = '';
                        $scope.time = '';

                        //reset form validation
                        $scope.addCallForm.$setPristine();
                        $scope.addCallForm.$setValidity();
                        $scope.addCallForm.$setUntouched();
                    }

                    $scope.convertPhone = function (phone_number) {
                        var result = phone_number;

                        //convert to this line 00XXX XXX XXX XXX
                        result = result.replace(/\(|\)|-| /g, "");
                        result = result.replace(/\+/g, "00");

                        return result.slice(0, 5) + ' ' + result.slice(5, 8) + ' ' + result.slice(8, 11) + ' ' + result.slice(11);
                    }
                }
            }
        }
})();
(function () {
    'use strict';

    angular
        .module('myApp')
        .directive('callList', callListDirective);
        
        callListDirective.$inject = ['CONSTS'];
        function callListDirective(CONSTS){
             return {
                restrict: 'E',
                templateUrl: 'js/directives/callList/tpl.html',
                link: function ($scope) {

                    $scope.predicate = 'time';
                    $scope.reverse = false;
                    $scope.order = function (predicate) {
                        $scope.reverse = ($scope.predicate === predicate) && !$scope.reverse;
                        $scope.predicate = predicate;
                    };

                    $scope.timeInPast = function (time) {
                        var currentTime = new Date().getTime();

                        return time <= currentTime;
                    }

                    // timeViewFilter
                    $scope.timeFilter = CONSTS.TIMEFILTER.ALL; // also can be future or past
                    $scope.setTimeFilter = function (value) {
                        $scope.timeFilter = value;
                    };
                    $scope.toogleView = function (time) {
                        var currentTime = new Date().getTime(),
                            timeFilter = $scope.timeFilter;

                        return !((timeFilter === CONSTS.TIMEFILTER.FINISHED && time >= currentTime) || // for finished filter we hide future items
                            (timeFilter === CONSTS.TIMEFILTER.NEXT && time < currentTime))  // for next filter we will do revert
                    }
                }
            }
        }
})();
(function () {
    'use strict';

    angular
        .module('myApp')
        .directive('nextCall', nextCall);
        
        function nextCall() {
            return {
                restrict: 'E',
                templateUrl: 'js/directives/nextCall/tpl.html'
            }
        }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1haW4uanMiLCJhZGRDYWxsL3NjcmlwdC5qcyIsImNhbGxMaXN0L3NjcmlwdC5qcyIsIm5leHRDYWxsL3NjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJqcy9hcHAtYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gc2V0IGFuZ3VsYXIgbW9kdWxlIGFuZCBkZXBlbmRlbmN5XG5hbmd1bGFyXG4gICAgLm1vZHVsZSgnbXlBcHAnLCBbJ3VpLmJvb3RzdHJhcCcsICd1aS5ib290c3RyYXAuZGF0ZXRpbWVwaWNrZXInXSlcbiAgICAuY29uc3RhbnQoJ0NPTlNUUycsIHtcbiAgICAgICAgVElNRUZJTFRFUjoge1xuICAgICAgICAgICAgQUxMOiAwLFxuICAgICAgICAgICAgRklOSVNIRUQ6IDEsXG4gICAgICAgICAgICBORVhUOiAyXG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4iLCIoZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnbXlBcHAnKVxuICAgICAgICAuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCBNYWluQ29udHJvbGxlcilcbiAgICAgICAgXG4gICAgICAgIE1haW5Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZSddXG4gICAgICAgIGZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCRzY29wZSkge1xuXG4gICAgICAgICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgICAgICAgJHNjb3BlLm5leHRDYWxsID0ge307XG4gICAgICAgICAgICAkc2NvcGUuY2FsbExpc3QgPSBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnU2FtIFRhaWxvcicsXG4gICAgICAgICAgICAgICAgICAgIHBob25lOiAnMDA0MjAgMTIxIDI0MiAzNDMnLFxuICAgICAgICAgICAgICAgICAgICB0aW1lOiAxMjg4MzIzNjIzMDA2XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdUb20gSGVua3MnLFxuICAgICAgICAgICAgICAgICAgICBwaG9uZTogJzAwNDIwIDEyMSAyNDIgNTU1JyxcbiAgICAgICAgICAgICAgICAgICAgdGltZTogMTI0ODMyOTYyNjAwMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICB2bS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxvY2FsRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsaXN0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY2FsbExpc3QgPSBhbmd1bGFyLmZyb21Kc29uKGxvY2FsRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHZtLmZpbmROZXh0Q2FsbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZtLnNhdmVEYXRhID0gZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNhbGxMaXN0LnB1c2goZW50cnkpO1xuICAgICAgICAgICAgICAgIHZtLnVwZGF0ZURhdGEoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZtLnJlbW92ZUl0ZW0gPSBmdW5jdGlvbiAodGltZSkge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBieSB0aW1lIGJlY291c2UgaXQgaXMgdW5pcXVlIGZvciBlYWNoIGRhdGEgaXRlbVxuICAgICAgICAgICAgICAgIF8ucmVtb3ZlKCRzY29wZS5jYWxsTGlzdCwgeyAndGltZSc6IHRpbWUgfSk7XG4gICAgICAgICAgICAgICAgdm0udXBkYXRlRGF0YSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZtLnVwZGF0ZURhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpc3QnLCBhbmd1bGFyLnRvSnNvbigkc2NvcGUuY2FsbExpc3QpKTtcbiAgICAgICAgICAgICAgICB2bS5maW5kTmV4dENhbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZtLmZpbmROZXh0Q2FsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWxsRGF0YSA9ICRzY29wZS5jYWxsTGlzdCxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gXy5zb3J0QnkoYWxsRGF0YSwgJ3RpbWUnKTsgLy8gZmlyc3RseSBzb3J0IGFsbCBkYXRhIGJ5IHRpbWVcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBfLmZpbmQocmVzdWx0LCBmdW5jdGlvbiAoaXRlbSkgeyAgLy8gdGhlbiBmaW5kIGZpcnN0IG5lYXIgZnV0dXJlIGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udGltZSA+PSBjdXJyZW50VGltZTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5uZXh0Q2FsbCA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaW5pdCBhcHBcbiAgICAgICAgICAgIHZtLnJlbmRlcigpO1xuICAgICAgICB9XG5cbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ215QXBwJylcbiAgICAgICAgLmRpcmVjdGl2ZSgnYWRkQ2FsbEZvcm0nLCBhZGRDYWxsRm9ybSk7XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiBhZGRDYWxsRm9ybSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2RpcmVjdGl2ZXMvYWRkQ2FsbC90cGwuaHRtbCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJyxcbiAgICAgICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoJHNjb3BlLCBlbGVtZW50LCBhdHRycywgY3RybCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubmFtZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubmFtZU1heExlbmd0aCA9IDMwO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucGhvbmUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnBob25lUGF0dGVybiA9ICcoXFxcXCt8MDApKFxcXFwoP1xcXFxkezN9XFxcXCk/LT8pKFxcXFxzP1xcXFxkezN9KXszfSc7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGltZVBpY2tlciBwYXJhbXNcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnRpbWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnRpbWVQaWNrZXJJc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnRpbWVQYXR0ZXJuID0gJyhbMDFdXFxcXGR8MlswLTNdKTo/KFswLTVdXFxcXGQpJztcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnRpbWVPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHlJbnB1dDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93TWVyaWRpYW46IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5vcGVuQ2FsZW5kYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUudGltZVBpY2tlcklzT3BlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIC8vZW5kIHRpbWVQaWNrZXIgcGFyYW1zXG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFkZENhbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3Q2FsbCA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLm5hbWUgJiYgJHNjb3BlLnBob25lICYmICRzY29wZS50aW1lKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUucGhvbmUgPSAkc2NvcGUuY29udmVydFBob25lKCRzY29wZS5waG9uZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYWxsID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAkc2NvcGUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmU6ICRzY29wZS5waG9uZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZTogJHNjb3BlLnRpbWUuZ2V0VGltZSgpIC8vcGFyc2UgZGF0ZSB0byBzdG9yZSBpbiBtaWxpc2Vjb25kc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNhdmVEYXRhKG5ld0NhbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXNldCBmaWVsZHMgZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm5hbWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5waG9uZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnRpbWUgPSAnJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXNldCBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5hZGRDYWxsRm9ybS4kc2V0UHJpc3RpbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5hZGRDYWxsRm9ybS4kc2V0VmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5hZGRDYWxsRm9ybS4kc2V0VW50b3VjaGVkKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY29udmVydFBob25lID0gZnVuY3Rpb24gKHBob25lX251bWJlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHBob25lX251bWJlcjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb252ZXJ0IHRvIHRoaXMgbGluZSAwMFhYWCBYWFggWFhYIFhYWFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoL1xcKHxcXCl8LXwgL2csIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoL1xcKy9nLCBcIjAwXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LnNsaWNlKDAsIDUpICsgJyAnICsgcmVzdWx0LnNsaWNlKDUsIDgpICsgJyAnICsgcmVzdWx0LnNsaWNlKDgsIDExKSArICcgJyArIHJlc3VsdC5zbGljZSgxMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ215QXBwJylcbiAgICAgICAgLmRpcmVjdGl2ZSgnY2FsbExpc3QnLCBjYWxsTGlzdERpcmVjdGl2ZSk7XG4gICAgICAgIFxuICAgICAgICBjYWxsTGlzdERpcmVjdGl2ZS4kaW5qZWN0ID0gWydDT05TVFMnXTtcbiAgICAgICAgZnVuY3Rpb24gY2FsbExpc3REaXJlY3RpdmUoQ09OU1RTKXtcbiAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9kaXJlY3RpdmVzL2NhbGxMaXN0L3RwbC5odG1sJyxcbiAgICAgICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoJHNjb3BlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnByZWRpY2F0ZSA9ICd0aW1lJztcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnJldmVyc2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm9yZGVyID0gZnVuY3Rpb24gKHByZWRpY2F0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnJldmVyc2UgPSAoJHNjb3BlLnByZWRpY2F0ZSA9PT0gcHJlZGljYXRlKSAmJiAhJHNjb3BlLnJldmVyc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUucHJlZGljYXRlID0gcHJlZGljYXRlO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS50aW1lSW5QYXN0ID0gZnVuY3Rpb24gKHRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGltZSA8PSBjdXJyZW50VGltZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRpbWVWaWV3RmlsdGVyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS50aW1lRmlsdGVyID0gQ09OU1RTLlRJTUVGSUxURVIuQUxMOyAvLyBhbHNvIGNhbiBiZSBmdXR1cmUgb3IgcGFzdFxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2V0VGltZUZpbHRlciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnRpbWVGaWx0ZXIgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnRvb2dsZVZpZXcgPSBmdW5jdGlvbiAodGltZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZUZpbHRlciA9ICRzY29wZS50aW1lRmlsdGVyO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gISgodGltZUZpbHRlciA9PT0gQ09OU1RTLlRJTUVGSUxURVIuRklOSVNIRUQgJiYgdGltZSA+PSBjdXJyZW50VGltZSkgfHwgLy8gZm9yIGZpbmlzaGVkIGZpbHRlciB3ZSBoaWRlIGZ1dHVyZSBpdGVtc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aW1lRmlsdGVyID09PSBDT05TVFMuVElNRUZJTFRFUi5ORVhUICYmIHRpbWUgPCBjdXJyZW50VGltZSkpICAvLyBmb3IgbmV4dCBmaWx0ZXIgd2Ugd2lsbCBkbyByZXZlcnRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnbXlBcHAnKVxuICAgICAgICAuZGlyZWN0aXZlKCduZXh0Q2FsbCcsIG5leHRDYWxsKTtcbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIG5leHRDYWxsKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnanMvZGlyZWN0aXZlcy9uZXh0Q2FsbC90cGwuaHRtbCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
