app.directive('callList', function () {
    return {
        restrict: 'E',
        templateUrl: './js/directives/callList/tpl.html',
        link: function (scope) {
            scope.removeItem = function(id){
                _.remove(scope.callList, {'id': id});
            };
            scope.callList = [
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
            ]
        }
    }
})