'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('PreviewCtrl', function ($scope, $timeout, $location, widgetService) {

        var timeout = 0;
        var milliseconds = 0;
        $scope.selectedWidget = {};
        $scope.widgetTime = '';
        $scope.page_url = $location.protocol() +'://' + $location.host() + ':' + $location.port();

        $scope.onWidgetsLoaded = function (widgetsList) {
            $scope.widgetsList = widgetsList;
            $scope.selectedWidget = $scope.widgetsList[0];
            startTimer();
        };

        $scope.widgetClick = function (widget) {
            $scope.selectedWidget = widget;
            startTimer();
            console.log(widget.productName + ' selected');
        };

        $scope.onTimeout = function() {
            if (milliseconds > 0) {
                milliseconds -= 1000;
                $scope.widgetTime = millisecondsToTime(milliseconds) +  ' Min.';
                timeout = $timeout($scope.onTimeout, 1000);
            } else {
                $timeout.cancel(timeout);
                $location.path('/signup');
            }
        };

        function startTimer() {
            $timeout.cancel(timeout);
            milliseconds = $scope.selectedWidget.lifeExpectancy;
            timeout = $timeout($scope.onTimeout, 1000);
        }

        function millisecondsToTime(milli)
        {
            var seconds = Math.floor((milli / 1000) % 60);
            var minutes = Math.floor((milli / (60 * 1000)) % 60);

            return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        }

        widgetService.getWidgetList($scope.onWidgetsLoaded);
    });
