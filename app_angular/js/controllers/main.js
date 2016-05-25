'use strict';

angular
    .module('myApp')
    .controller('MainController', function ($scope) {

        var vm = this;

        vm.callList = [
            {
                name: 'Sam Tailor',
                phone: '2189-3298',
                time: 1288323623006
            },
            {
                name: 'Tom',
                phone: '1189-3298',
                time: 1288323623002
            }
        ];
        vm.render = function () {
            var localData = localStorage.getItem('list');
            if (localData) {
                vm.callList = angular.fromJson(localData);
                vm.findNextCall();
            }
        }
        vm.saveData = function (entry) {
            vm.callList.push(entry);
            vm.updateData();
        }
        vm.removeItem = function (time) {
            // remove by time becouse it is unique for each data item
            _.remove(vm.callList, { 'time': time });
            vm.updateData();
        };
        vm.updateData = function () {
            localStorage.setItem('list', angular.toJson(vm.callList));
            vm.findNextCall();
        }
        vm.nextCall = {};
        vm.findNextCall = function () {
            var allData = vm.callList,
                result,
                currentTime = new Date().getTime();

            result = _.sortBy(allData, 'time'); // firstly sort all data by time
            result = _.find(result, function (item) {  // then find first near future item
                return item.time >= currentTime;
            });

            vm.nextCall = result;
        }

        // init app
        vm.render();
    });
