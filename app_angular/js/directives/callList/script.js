app.directive('callList', function () {
    return {
        restrict: 'E',
        templateUrl: './js/directives/callList/tpl.html',
        link: function (scope) {
            scope.removeItem = function(id){
                _.remove(scope.callList, {'id': id});
            };
        }
    }
})