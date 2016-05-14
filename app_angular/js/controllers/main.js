var app = angular.module('myApp');

app.controller('mainCtrl', function ($scope) {
    
    $scope.callList = [
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
    $scope.render = function() {
        var localData = localStorage.getItem('list');
        if (localData) {
            $scope.callList = JSON.parse(localData);
        }
    }
    $scope.saveData = function(entry) {
        $scope.callList.push(entry);
        $scope.updateData();
    }
    $scope.removeItem = function (time) {
        // remove by time becouse it is unique for each data item
        _.remove($scope.callList, { 'time': time });
        $scope.updateData();
    };  
    $scope.updateData = function() {
        localStorage.setItem('list', JSON.stringify($scope.callList));
    }
    
    // init app
    $scope.render();
});