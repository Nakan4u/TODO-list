app.directive('callList', function () {
    return {
        restrict: 'E',
        templateUrl: './js/directives/callList/tpl.html',
        link: function ($scope) {
            
            $scope.predicate = 'time';
            $scope.reverse = false;
            $scope.order = function (predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };
            
            $scope.timeInPast = function (time) {
                
                var currentTime = new Date().getTime();

                return (time <= currentTime) ? true : false;
            }
        }
    }
})