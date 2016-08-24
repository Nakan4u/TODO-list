// set angular module and dependency
angular
    .module('myApp', ['ui.bootstrap', 'ui.bootstrap.datetimepicker'])
    .constant('CONSTS', {
        TIMEFILTER: {
            ALL: 'all',
            FINISHED: 'finished',
            NEXT: 'next'
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
                    time: 1248323623006
                },
                {
                    name: 'Tom Henks',
                    phone: '00420 121 242 555',
                    time: 1248329626002
                },
                {
                    name: 'Adam Smith',
                    phone: '00420 121 242 432',
                    time: 1248325624001
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
                $scope.time = null;
                $scope.timePickerIsOpen = false;
                $scope.timePattern = '([01]\\d|2[0-3]):?([0-5]\\d)';
                $scope.timeOptions = {
                    defaultTime: '11:00:22',
                    'readonly-input': true
                };
                $scope.dateOptions = {
                    initDate: new Date()
                };
                $scope.openCalendar = function () {
                    $scope.timePickerIsOpen = true;
                };
                // add watcher to solve problem with incorect time, and set always today date
                $scope.$watch(function () { return $scope.time; },
                    function (oldValue, newValue) {
                        if (newValue == null && oldValue) {
                            var date = oldValue;
                            var today = new Date();
                            today.setHours(date.getHours());
                            today.setMinutes(date.getMinutes());

                            $scope.time = today;
                        }
                    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1haW4uanMiLCJhZGRDYWxsL3NjcmlwdC5qcyIsImNhbGxMaXN0L3NjcmlwdC5qcyIsIm5leHRDYWxsL3NjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoianMvYXBwLWJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNldCBhbmd1bGFyIG1vZHVsZSBhbmQgZGVwZW5kZW5jeVxuYW5ndWxhclxuICAgIC5tb2R1bGUoJ215QXBwJywgWyd1aS5ib290c3RyYXAnLCAndWkuYm9vdHN0cmFwLmRhdGV0aW1lcGlja2VyJ10pXG4gICAgLmNvbnN0YW50KCdDT05TVFMnLCB7XG4gICAgICAgIFRJTUVGSUxURVI6IHtcbiAgICAgICAgICAgIEFMTDogJ2FsbCcsXG4gICAgICAgICAgICBGSU5JU0hFRDogJ2ZpbmlzaGVkJyxcbiAgICAgICAgICAgIE5FWFQ6ICduZXh0J1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuIiwiKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ215QXBwJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpXG4gICAgICAgIFxuICAgICAgICBNYWluQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnXVxuICAgICAgICBmdW5jdGlvbiBNYWluQ29udHJvbGxlcigkc2NvcGUpIHtcblxuICAgICAgICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgICAgICAgICRzY29wZS5uZXh0Q2FsbCA9IHt9O1xuICAgICAgICAgICAgJHNjb3BlLmNhbGxMaXN0ID0gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ1NhbSBUYWlsb3InLFxuICAgICAgICAgICAgICAgICAgICBwaG9uZTogJzAwNDIwIDEyMSAyNDIgMzQzJyxcbiAgICAgICAgICAgICAgICAgICAgdGltZTogMTI0ODMyMzYyMzAwNlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnVG9tIEhlbmtzJyxcbiAgICAgICAgICAgICAgICAgICAgcGhvbmU6ICcwMDQyMCAxMjEgMjQyIDU1NScsXG4gICAgICAgICAgICAgICAgICAgIHRpbWU6IDEyNDgzMjk2MjYwMDJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ0FkYW0gU21pdGgnLFxuICAgICAgICAgICAgICAgICAgICBwaG9uZTogJzAwNDIwIDEyMSAyNDIgNDMyJyxcbiAgICAgICAgICAgICAgICAgICAgdGltZTogMTI0ODMyNTYyNDAwMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICB2bS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxvY2FsRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsaXN0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY2FsbExpc3QgPSBhbmd1bGFyLmZyb21Kc29uKGxvY2FsRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHZtLmZpbmROZXh0Q2FsbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZtLnNhdmVEYXRhID0gZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNhbGxMaXN0LnB1c2goZW50cnkpO1xuICAgICAgICAgICAgICAgIHZtLnVwZGF0ZURhdGEoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZtLnJlbW92ZUl0ZW0gPSBmdW5jdGlvbiAodGltZSkge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBieSB0aW1lIGJlY291c2UgaXQgaXMgdW5pcXVlIGZvciBlYWNoIGRhdGEgaXRlbVxuICAgICAgICAgICAgICAgIF8ucmVtb3ZlKCRzY29wZS5jYWxsTGlzdCwgeyAndGltZSc6IHRpbWUgfSk7XG4gICAgICAgICAgICAgICAgdm0udXBkYXRlRGF0YSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZtLnVwZGF0ZURhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpc3QnLCBhbmd1bGFyLnRvSnNvbigkc2NvcGUuY2FsbExpc3QpKTtcbiAgICAgICAgICAgICAgICB2bS5maW5kTmV4dENhbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZtLmZpbmROZXh0Q2FsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWxsRGF0YSA9ICRzY29wZS5jYWxsTGlzdCxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gXy5zb3J0QnkoYWxsRGF0YSwgJ3RpbWUnKTsgLy8gZmlyc3RseSBzb3J0IGFsbCBkYXRhIGJ5IHRpbWVcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBfLmZpbmQocmVzdWx0LCBmdW5jdGlvbiAoaXRlbSkgeyAgLy8gdGhlbiBmaW5kIGZpcnN0IG5lYXIgZnV0dXJlIGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udGltZSA+PSBjdXJyZW50VGltZTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5uZXh0Q2FsbCA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaW5pdCBhcHBcbiAgICAgICAgICAgIHZtLnJlbmRlcigpO1xuICAgICAgICB9XG5cbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ215QXBwJylcbiAgICAgICAgLmRpcmVjdGl2ZSgnYWRkQ2FsbEZvcm0nLCBhZGRDYWxsRm9ybSk7XG5cbiAgICBmdW5jdGlvbiBhZGRDYWxsRm9ybSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2RpcmVjdGl2ZXMvYWRkQ2FsbC90cGwuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInLFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKCRzY29wZSwgZWxlbWVudCwgYXR0cnMsIGN0cmwpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUubmFtZSA9ICcnO1xuICAgICAgICAgICAgICAgICRzY29wZS5uYW1lTWF4TGVuZ3RoID0gMzA7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnBob25lID0gJyc7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnBob25lUGF0dGVybiA9ICcoXFxcXCt8MDApKFxcXFwoP1xcXFxkezN9XFxcXCk/LT8pKFxcXFxzP1xcXFxkezN9KXszfSc7XG5cbiAgICAgICAgICAgICAgICAvLyB0aW1lUGlja2VyIHBhcmFtc1xuICAgICAgICAgICAgICAgICRzY29wZS50aW1lID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUudGltZVBpY2tlcklzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRzY29wZS50aW1lUGF0dGVybiA9ICcoWzAxXVxcXFxkfDJbMC0zXSk6PyhbMC01XVxcXFxkKSc7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnRpbWVPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VGltZTogJzExOjAwOjIyJyxcbiAgICAgICAgICAgICAgICAgICAgJ3JlYWRvbmx5LWlucHV0JzogdHJ1ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGVPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICBpbml0RGF0ZTogbmV3IERhdGUoKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgJHNjb3BlLm9wZW5DYWxlbmRhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnRpbWVQaWNrZXJJc09wZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy8gYWRkIHdhdGNoZXIgdG8gc29sdmUgcHJvYmxlbSB3aXRoIGluY29yZWN0IHRpbWUsIGFuZCBzZXQgYWx3YXlzIHRvZGF5IGRhdGVcbiAgICAgICAgICAgICAgICAkc2NvcGUuJHdhdGNoKGZ1bmN0aW9uICgpIHsgcmV0dXJuICRzY29wZS50aW1lOyB9LFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAob2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUgPT0gbnVsbCAmJiBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRlID0gb2xkVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2RheS5zZXRIb3VycyhkYXRlLmdldEhvdXJzKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZGF5LnNldE1pbnV0ZXMoZGF0ZS5nZXRNaW51dGVzKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnRpbWUgPSB0b2RheTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy9lbmQgdGltZVBpY2tlciBwYXJhbXNcblxuICAgICAgICAgICAgICAgICRzY29wZS5hZGRDYWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3Q2FsbCA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgkc2NvcGUubmFtZSAmJiAkc2NvcGUucGhvbmUgJiYgJHNjb3BlLnRpbWUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnBob25lID0gJHNjb3BlLmNvbnZlcnRQaG9uZSgkc2NvcGUucGhvbmUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdDYWxsID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICRzY29wZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBob25lOiAkc2NvcGUucGhvbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZTogJHNjb3BlLnRpbWUuZ2V0VGltZSgpIC8vcGFyc2UgZGF0ZSB0byBzdG9yZSBpbiBtaWxpc2Vjb25kc1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zYXZlRGF0YShuZXdDYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAvL3Jlc2V0IGZpZWxkcyBkYXRhXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5uYW1lID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5waG9uZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudGltZSA9ICcnO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vcmVzZXQgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5hZGRDYWxsRm9ybS4kc2V0UHJpc3RpbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFkZENhbGxGb3JtLiRzZXRWYWxpZGl0eSgpO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYWRkQ2FsbEZvcm0uJHNldFVudG91Y2hlZCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICRzY29wZS5jb252ZXJ0UGhvbmUgPSBmdW5jdGlvbiAocGhvbmVfbnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBwaG9uZV9udW1iZXI7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9jb252ZXJ0IHRvIHRoaXMgbGluZSAwMFhYWCBYWFggWFhYIFhYWFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZSgvXFwofFxcKXwtfCAvZywgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKC9cXCsvZywgXCIwMFwiKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LnNsaWNlKDAsIDUpICsgJyAnICsgcmVzdWx0LnNsaWNlKDUsIDgpICsgJyAnICsgcmVzdWx0LnNsaWNlKDgsIDExKSArICcgJyArIHJlc3VsdC5zbGljZSgxMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnbXlBcHAnKVxuICAgICAgICAuZGlyZWN0aXZlKCdjYWxsTGlzdCcsIGNhbGxMaXN0RGlyZWN0aXZlKTtcbiAgICAgICAgXG4gICAgICAgIGNhbGxMaXN0RGlyZWN0aXZlLiRpbmplY3QgPSBbJ0NPTlNUUyddO1xuICAgICAgICBmdW5jdGlvbiBjYWxsTGlzdERpcmVjdGl2ZShDT05TVFMpe1xuICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2RpcmVjdGl2ZXMvY2FsbExpc3QvdHBsLmh0bWwnLFxuICAgICAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uICgkc2NvcGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucHJlZGljYXRlID0gJ3RpbWUnO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucmV2ZXJzZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUub3JkZXIgPSBmdW5jdGlvbiAocHJlZGljYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUucmV2ZXJzZSA9ICgkc2NvcGUucHJlZGljYXRlID09PSBwcmVkaWNhdGUpICYmICEkc2NvcGUucmV2ZXJzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5wcmVkaWNhdGUgPSBwcmVkaWNhdGU7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnRpbWVJblBhc3QgPSBmdW5jdGlvbiAodGltZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aW1lIDw9IGN1cnJlbnRUaW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGltZVZpZXdGaWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnRpbWVGaWx0ZXIgPSBDT05TVFMuVElNRUZJTFRFUi5BTEw7IC8vIGFsc28gY2FuIGJlIGZ1dHVyZSBvciBwYXN0XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZXRUaW1lRmlsdGVyID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUudGltZUZpbHRlciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudG9vZ2xlVmlldyA9IGZ1bmN0aW9uICh0aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lRmlsdGVyID0gJHNjb3BlLnRpbWVGaWx0ZXI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhKCh0aW1lRmlsdGVyID09PSBDT05TVFMuVElNRUZJTFRFUi5GSU5JU0hFRCAmJiB0aW1lID49IGN1cnJlbnRUaW1lKSB8fCAvLyBmb3IgZmluaXNoZWQgZmlsdGVyIHdlIGhpZGUgZnV0dXJlIGl0ZW1zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRpbWVGaWx0ZXIgPT09IENPTlNUUy5USU1FRklMVEVSLk5FWFQgJiYgdGltZSA8IGN1cnJlbnRUaW1lKSkgIC8vIGZvciBuZXh0IGZpbHRlciB3ZSB3aWxsIGRvIHJldmVydFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdteUFwcCcpXG4gICAgICAgIC5kaXJlY3RpdmUoJ25leHRDYWxsJywgbmV4dENhbGwpO1xuICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gbmV4dENhbGwoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9kaXJlY3RpdmVzL25leHRDYWxsL3RwbC5odG1sJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
