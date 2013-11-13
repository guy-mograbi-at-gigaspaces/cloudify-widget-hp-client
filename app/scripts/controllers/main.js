'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('MainCtrl', function ($scope, $location, widgetService) {

        $scope.widgetsList = [];
        $scope.conf = window.conf;

        widgetService.getWidgetList()
            .then(function(data) {
                $scope.widgetsList = data;
            });

        $scope.redirectPage = function(pageName) {
            $location.path('/' + pageName);
        };

    });
