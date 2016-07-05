// set angular module and dependency
angular
    .module('myApp', ['ui.bootstrap', 'ui.bootstrap.datetimepicker'])
    .constant('CONSTS', {
        TIMEFILTER: {
            ALL: 0,
            FINISHED: 1,
            NEXT: 2
        }
    });


