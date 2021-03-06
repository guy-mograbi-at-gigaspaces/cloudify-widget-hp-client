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
            .when('/free', {
                templateUrl: 'views/preview.html',
                controller: 'PreviewCtrl'
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
                templateUrl: 'views/support.html',
                controller: 'SupportCtrl'
            })
            .when('/terms', {
                templateUrl: 'views/terms.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
