var app = angular.module('myApp');

app.controller('mainCtrl', function ($scope) {
    
    $scope.callList = [
        {
            id: 1,
            name: 'Sam Tailor',
            phone: '2189-3298',
            time: 1288323623006
        }
    ];
    $scope.render = function() {
        var localData = localStorage.getItem('list');
        if (localData) {
            $scope.callList = JSON.parse(localData);
        }
    }
    $scope.saveData = function(entry) {
        var id = $scope.callList.length + 1;
        
        entry.id = id;
        $scope.callList.push(entry);
        $scope.updateData();
    }
    $scope.updateData = function() {
        localStorage.setItem('list', JSON.stringify($scope.callList));
    }
    
    // init app
    $scope.render();
});