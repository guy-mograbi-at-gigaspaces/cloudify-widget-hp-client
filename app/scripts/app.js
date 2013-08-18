'use strict';

angular.module('cloudifyWidgetHpClientApp', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/widget', {
                templateUrl: 'views/widget.html',
                controller: 'WidgetCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
