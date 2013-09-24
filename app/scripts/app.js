'use strict';

angular.module('cloudifyWidgetHpClientApp', ['ngCookies'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/demo', {
                templateUrl: 'views/demo.html',
                controller: 'DemoCtrl'
            })
            .when('/preview', {
                templateUrl: 'views/preview.html',
                controller: 'PreviewCtrl'
            })
            .when('/signup', {
                templateUrl: 'views/signup.html',
                controller: 'SignupCtrl'
            })
            .when('/registered', {
                templateUrl: 'views/preview.html',
                controller: 'PreviewCtrl'
            })
            .when('/learn', {
                templateUrl: 'views/learn.html',
                controller: 'LearnCtrl'
            })
            .when('/support', {
                templateUrl: 'views/support.html'
            })
            .when('/landing', {
                templateUrl: 'views/landing.html',
                controller: 'PreviewCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
