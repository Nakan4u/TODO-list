app.directive('addCallForm', function () {
    return {
        restrict: 'E',
        templateUrl: './js/directives/addCall/tpl.html',
        link: function ($scope) {
            $scope.name = '';
            $scope.nameMaxLength = 30;
            $scope.phone = '+(420) 111 222 333';
            $scope.phonePattern = '(\\+|00)(\\(?\\d{3}\\)?-?)(\\s?\\d{3}){3}';
            $scope.time = '10:22';
            $scope.timePattern = '([01]\\d|2[0-3]):?([0-5]\\d)';

            $scope.addCall = function () {
                var newCall = {};

                if ($scope.name && $scope.phone && $scope.time) {
                    
                    $scope.phone = $scope.convertPhone($scope.phone);
                    
                    newCall = {
                        name: $scope.name,
                        phone: $scope.phone,
                        time: $scope.time
                    }
                    //$scope.callList.push(newCall);
                    $scope.saveData(newCall);
                    $scope.reset();
                    
                }
            }
            
            $scope.reset = function () {
                //reset fields data
                $scope.name = '';
                $scope.phone = '';
                $scope.time = '';
                
                //reset form validation
                $scope.addCallForm.$setPristine();
                $scope.addCallForm.$setValidity();
                $scope.addCallForm.$setUntouched();
            }
            
            $scope.convertPhone = function (phone_number) {
                var result = phone_number;
                
                //convert to this line 00XXX XXX XXX XXX
                result = result.replace(/\(|\)|-| /g, "");
                result = result.replace(/\+/g, "00");
                
                return result.slice(0, 5) + ' ' + result.slice(5, 8) + ' ' + result.slice(8, 11) + ' ' + result.slice(11);
            }
        }
    }
})