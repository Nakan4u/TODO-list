app.directive('addCallForm', function () {
    return {
        restrict: 'E',
        templateUrl: './js/directives/addCall/tpl.html',
        link: function ($scope) {
            $scope.name = '';
            $scope.phone = '911';
            $scope.time = '10:22';
            
            $scope.addCall = function() {
                var newCall = {};
                
                if ($scope.name && $scope.phone && $scope.time) {
                    newCall = {
                        name: $scope.name,
                        phone: $scope.phone,
                        time: $scope.time
                    }
                    $scope.callList.push(newCall);
                    $scope.reset();
                }
            }
            $scope.reset = function() {
                $scope.name = '';
                $scope.phone = '';
                $scope.time = '';
            }
        }
    }
})