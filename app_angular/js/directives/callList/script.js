
    angular
        .module('myApp')
        .directive('callList', function () {
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

                    // timeViewFilter
                    $scope.timeFilter = 'all'; // also can be future or past
                    $scope.setTimeFilter = function (value) {
                        $scope.timeFilter = value;
                    };
                    $scope.toogleView = function (time) {
                        var currentTime = new Date().getTime(),
                            timeFilter = $scope.timeFilter;

                        if ((timeFilter === 'finished' && time >= currentTime) || // for finished filter we hide future items
                            (timeFilter === 'next' && time < currentTime)) {  // for next filter we will do revert

                            return false;
                        } else {
                            return true; // for all we show all items
                        }
                    }
                }
            }
        })
