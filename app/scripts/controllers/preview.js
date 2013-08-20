'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('PreviewCtrl', function ($scope, widgetService) {

        $scope.selectedWidget = {};

        $scope.onWidgetsLoaded = function (widgetsList) {
            $scope.widgetsList = widgetsList;
            $scope.selectedWidget = $scope.widgetsList[0];
        };

        $scope.widgetClick = function (widget) {
            $scope.selectedWidget = widget;
            console.log(widget.productName + ' selected');
        };

        widgetService.getWidgetList($scope.onWidgetsLoaded);
    });
