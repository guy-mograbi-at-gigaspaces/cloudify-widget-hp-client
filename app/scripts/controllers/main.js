'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('MainCtrl', function ($scope, $location, widgetService) {

        $scope.widgetsList = [];
        $scope.conf = window.conf;
        $scope.iconsBarWidth = 800;

        var ICON_WIDTH = 50;
        var ICON_PADDING = 20;

        widgetService.getWidgetList()
            .then(function(data) {
                $scope.widgetsList = data;
                $scope.iconsBarWidth = $scope.widgetsList.length * (ICON_WIDTH + ICON_PADDING);
            });

        $scope.redirectPage = function(pageName) {
            $location.path('/' + pageName);
        };

    });
