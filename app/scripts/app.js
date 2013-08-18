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
            .when('/demo', {
                templateUrl: 'views/demo.html',
                controller: 'DemoCtrl'
            })
            .when('/signup', {
                templateUrl: 'views/signup.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
