'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('PreviewCtrl', function ($scope, $location, $timeout, $cookieStore, widgetService) {

        var timeout = 0;
        var milliseconds = 0;
        $scope.currentStep = $location.path() === '/registered' ? 4 : 2;
        $scope.selectedWidget = {};
        $scope.widgetTime = '';
        $scope.pageUrl = $location.protocol() +'://' + $location.host();

        $scope.onWidgetsLoaded = function (widgetsList) {
            $scope.widgetsList = widgetsList;
        };

        $scope.widgetClick = function (widget) {
//            updateSelectedWidget(widget);
            $scope.selectedWidget = widget;
        };

        $scope.onTimeout = function() {
            milliseconds -= 1000;
            $scope.widgetTime = millisecondsToTime(milliseconds);
            timeout = $timeout($scope.onTimeout, 1000);
        };

        function startTimer() {
            stopTimer();
            timeout = $timeout($scope.onTimeout, 1000);
        }

        function stopTimer() {
            $timeout.cancel(timeout);
        }

        function millisecondsToTime(milli)
        {
            var seconds = Math.floor((milli / 1000) % 60);
            var minutes = Math.floor((milli / (60 * 1000)) % 60);
            var days = Math.floor(milli / (1000 * 60 * 60 * 24));
            var timeToDisplay = '';

            if (seconds < 0 || minutes < 0) {
                seconds = '--';
                minutes = '--';
            }

            if (days > 0) {
                timeToDisplay = days + ' Days';
            } else {
                timeToDisplay = minutes + ':' + (seconds < 10 ? '0' : '') + seconds + ' Min.';
            }

            return timeToDisplay;
        }

//        function updateSelectedWidget(widget) {
//            var newSelectionIndex = parseInt($('#widget' + widget.id).attr('index'), 10);
//            var selectedArrowOffset = 165 + newSelectionIndex;
//            var newSelectionHeight = parseInt($('#widget' + widget.id).css('height'), 10);
//
//            $('#selectedArrow').css({opacity: 1}).offset({top: selectedArrowOffset + (newSelectionIndex * newSelectionHeight)});
//        }

        $('#iframe').live('widget_status', function(e) {
            $scope.log = e.status.output;
            milliseconds = e.status.timeleftMillis;
            $cookieStore.put('instanceId', e.status.instanceId);

            startTimer();
        });

        $('#iframe').live('stop_widget', function() {
            $scope.widgetTime = '';
            stopTimer();
        });

        widgetService.getWidgetList($scope.onWidgetsLoaded);
        $('#selectedArrow').css({opacity: 0});
    });
