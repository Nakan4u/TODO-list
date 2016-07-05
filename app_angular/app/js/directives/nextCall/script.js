(function () {
    'use strict';

    angular
        .module('myApp')
        .directive('nextCall', nextCall);
        
        function nextCall() {
            return {
                restrict: 'E',
                templateUrl: 'js/directives/nextCall/tpl.html'
            }
        }
})();