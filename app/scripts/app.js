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
            .when('/preview', {
                templateUrl: 'views/preview.html'
            })
            .when('/signup', {
                templateUrl: 'views/signup.html',
                controller: 'SignupCtrl'
            })
            .when('/support', {
                templateUrl: 'views/support.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
