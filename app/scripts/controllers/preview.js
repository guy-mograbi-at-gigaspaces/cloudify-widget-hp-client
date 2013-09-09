'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('PreviewCtrl', function ($scope, $location, $timeout, widgetService) {

        var timeout = 0;
        var milliseconds = 0;
        $scope.currentStep = $location.path() === '/landing' ? 4 : 2;
        $scope.selectedWidget = {};
        $scope.widgetTime = '';
        $scope.pageUrl = $location.protocol() +'://' + $location.host();

        $scope.onWidgetsLoaded = function (widgetsList) {
            $scope.widgetsList = widgetsList;
            $scope.selectedWidget = $scope.widgetsList[0];
        };

        $scope.widgetClick = function (widget) {
            updateSelectedWidget(widget);
            $scope.selectedWidget = widget;
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

        function updateSelectedWidget(widget) {
            var newSelectionIndex = parseInt($('#widget' + widget.id).attr('index'), 10);
            var selectedArrowOffset = 125 + newSelectionIndex;
            var newSelectionHeight = parseInt($('#widget' + widget.id).css('height'), 10);

            $('#widget' + $scope.selectedWidget.id).removeClass('selected');
            $('#widget' + widget.id).addClass('selected');

            $('#selectedArrow').css({opacity: 1}).offset({top: selectedArrowOffset + (newSelectionIndex * newSelectionHeight)});
        }

        $('#iframe').live('widget_status', function(e) {
            $scope.log = e.status.output;
            milliseconds = e.status.timeleftMillis;
            startTimer();
        });

        widgetService.getWidgetList($scope.onWidgetsLoaded);
        $('#selectedArrow').css({opacity: 0});
    });
