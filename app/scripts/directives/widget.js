'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .directive('widget', function () {
        return {
            templateUrl: '/views/widgetSkin.html',
            restrict: 'A',
            scope: false
        };
    });
