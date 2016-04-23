app.directive('nextCall', function () {
    return {
        restrict: 'E',
        templateUrl: './js/directives/nextCall/tpl.html',
        link: function (scope) {
            scope.name = 'hello';
            scope.phone = '';
            scope.time = '';
        }
    }
})