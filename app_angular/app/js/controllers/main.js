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