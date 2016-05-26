(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('MainController', function ($scope, $rootScope) {

            var vm = this;

            $rootScope.callList = [
                {
                    name: 'Sam Tailor',
                    phone: '+(420) 113 222 393',
                    time: 1288323623006
                },
                {
                    name: 'Tom',
                    phone: '+(420) 121 242 333',
                    time: 1288323623002
                }
            ];
            vm.render = function () {
                var localData = localStorage.getItem('list');
                if (localData) {
                    $rootScope.callList = angular.fromJson(localData);
                    vm.findNextCall();
                }
            }
            vm.saveData = function (entry) {
                $rootScope.callList.push(entry);
                vm.updateData();
            }
            vm.removeItem = function (time) {
                // remove by time becouse it is unique for each data item
                _.remove($rootScope.callList, { 'time': time });
                vm.updateData();
            };
            vm.updateData = function () {
                localStorage.setItem('list', angular.toJson($rootScope.callList));
                vm.findNextCall();
            }
            $rootScope.nextCall = {};
            vm.findNextCall = function () {
                var allData = $rootScope.callList,
                    result,
                    currentTime = new Date().getTime();

                result = _.sortBy(allData, 'time'); // firstly sort all data by time
                result = _.find(result, function (item) {  // then find first near future item
                    return item.time >= currentTime;
                });

                $rootScope.nextCall = result;
            }

            // init app
            vm.render();
        });

})();