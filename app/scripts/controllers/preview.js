'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('PreviewCtrl', function ($scope, $timeout, $location, widgetService) {

        var timeout = 0;
        var milliseconds = 0;
        $scope.selectedWidget = {};
        $scope.widgetTime = '';
        $scope.pageUrl = $location.protocol() +'://' + $location.host();

        $scope.onWidgetsLoaded = function (widgetsList) {
            $scope.widgetsList = widgetsList;
            $scope.selectedWidget = $scope.widgetsList[0];
            //startTimer();
        };

        $scope.widgetClick = function (widget) {
            $scope.selectedWidget = widget;
            //startTimer();
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
            timeout = $timeout($scope.onTimeout, 1000);
        }

        function millisecondsToTime(milli)
        {
            var seconds = Math.floor((milli / 1000) % 60);
            var minutes = Math.floor((milli / (60 * 1000)) % 60);

            return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        }

        $('#iframe').live('widget_status', function(e) {
           $scope.log = e.status.output;
           milliseconds = e.status.timeleftMillis;
           startTimer();
        });

        widgetService.getWidgetList($scope.onWidgetsLoaded);
    });
