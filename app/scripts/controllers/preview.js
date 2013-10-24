'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('PreviewCtrl', function ($scope, $location, $timeout, $cookieStore, widgetService) {

        $scope.currentStep = $location.path() === '/registered' ? 4 : 2;
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
    });
