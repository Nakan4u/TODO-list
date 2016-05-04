var app = angular.module('myApp');

app.controller('mainCtrl', function ($scope) {
    $scope.callList = [
        {
            id: 1,
            name: 'Sam Tailor',
            phone: '2189-3298',
            time: '13:38'
        }, {
            id: 2,
            name: 'John Smith',
            phone: '4372-23',
            time: '17:23'
        }
    ];
});