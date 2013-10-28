'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('PreviewCtrl', function ($scope, $location, $timeout, $cookieStore, widgetService) {

        $scope.currentStep = $location.path() === '/preview' ? 2 : 4;
        $scope.leadMail = $cookieStore.get('leadMail');
        $scope.selectedWidget = null;
        $scope.widgetTime = '';
        $scope.conf = window.conf;

        widgetService.getWidgetList()
            .then(function(data) {
                $scope.widgetsList = data;
            });

        $scope.widgetClick = function (widget) {
            $scope.widgetTime = '';
            $scope.selectedWidget = widget;
        };

        $scope.signout = function() {
            $cookieStore.remove('leadId');
            $cookieStore.remove('instanceId');
            $cookieStore.remove('leadMail');
            $location.path('/signup');
        };

        $scope.activate = function() {
            $location.path('/signup');
        };
    });
