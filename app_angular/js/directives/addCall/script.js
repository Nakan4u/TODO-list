(function () {
    'use strict';

    angular
        .module('myApp')
        .directive('addCallForm', function () {
            return {
                restrict: 'E',
                templateUrl: './js/directives/addCall/tpl.html',
                controller: 'MainController',
                link: function ($scope, element, attrs, ctrl) {
                    $scope.name = '';
                    $scope.nameMaxLength = 30;
                    $scope.phone = '';
                    $scope.phonePattern = '(\\+|00)(\\(?\\d{3}\\)?-?)(\\s?\\d{3}){3}';

                    // timePicker params
                    $scope.time = '';
                    $scope.timePickerIsOpen = false;
                    $scope.timePattern = '([01]\\d|2[0-3]):?([0-5]\\d)';
                    $scope.timeOptions = {
                        readonlyInput: false,
                        showMeridian: false
                    };
                    $scope.openCalendar = function () {
                        $scope.timePickerIsOpen = true;
                    };
                    //end timePicker params

                    $scope.addCall = function () {
                        var newCall = {};

                        if ($scope.name && $scope.phone && $scope.time) {

                            $scope.phone = $scope.convertPhone($scope.phone);

                            newCall = {
                                name: $scope.name,
                                phone: $scope.phone,
                                time: $scope.time.getTime() //parse date to store in miliseconds
                            }
                            ctrl.saveData(newCall);
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
})();