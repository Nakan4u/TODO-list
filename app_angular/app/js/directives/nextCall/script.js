(function () {
    'use strict';

    angular
        .module('myApp')
        .directive('nextCall', function () {
            return {
                restrict: 'E',
                templateUrl: 'js/directives/nextCall/tpl.html'
            }
        })
})();