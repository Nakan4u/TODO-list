(function () {
    'use strict';

    angular
        .module('myApp')
        .directive('callList', callListDirective);
        
        callListDirective.$inject = ['CONSTS'];
        function callListDirective(CONSTS){
             return {
                restrict: 'E',
                templateUrl: 'js/directives/callList/tpl.html',
                link: function ($scope) {

                    $scope.predicate = 'time';
                    $scope.reverse = false;
                    $scope.order = function (predicate) {
                        $scope.reverse = ($scope.predicate === predicate) && !$scope.reverse;
                        $scope.predicate = predicate;
                    };

                    $scope.timeInPast = function (time) {
                        var currentTime = new Date().getTime();

                        return time <= currentTime;
                    }

                    // timeViewFilter
                    $scope.timeFilter = CONSTS.TIMEFILTER.ALL; // also can be future or past
                    $scope.setTimeFilter = function (value) {
                        $scope.timeFilter = value;
                    };
                    $scope.toogleView = function (time) {
                        var currentTime = new Date().getTime(),
                            timeFilter = $scope.timeFilter;

                        return !((timeFilter === CONSTS.TIMEFILTER.FINISHED && time >= currentTime) || // for finished filter we hide future items
                            (timeFilter === CONSTS.TIMEFILTER.NEXT && time < currentTime))  // for next filter we will do revert
                    }
                }
            }
        }
})();