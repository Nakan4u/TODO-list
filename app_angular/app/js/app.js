// set angular module and dependency
angular
    .module('myApp', ['ui.bootstrap', 'ui.bootstrap.datetimepicker'])
    .constant('CONSTS', {
        TIMEFILTER: {
            ALL: 'all',
            FINISHED: 'finished',
            NEXT: 'next'
        }
    });


