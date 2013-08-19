'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('PreviewCtrl', function ($scope, widgetService) {
        $scope.widgetsList = widgetService.getWidgetList();
        console.log($scope.widgetsList);
    });
