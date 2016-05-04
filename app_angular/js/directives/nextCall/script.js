app.directive('nextCall', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: './js/directives/nextCall/tpl.html',
        link: function ($scope) {
            $scope.name = 'hello1';
            $scope.phone = '';
            $scope.time = '';
        }
    }
})