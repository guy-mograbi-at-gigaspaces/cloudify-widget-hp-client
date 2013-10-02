'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('PreviewCtrl', function ($scope, $location, $timeout, $cookieStore, widgetService) {

        var timeout = 0;
        var milliseconds = 0;
        $scope.currentStep = $location.path() === '/registered' ? 4 : 2;
        $scope.selectedWidget = {};
        $scope.widgetTime = '';
        $scope.pageUrl = $location.protocol() +'://' + $location.host();
        $scope.conf = window.conf;

        widgetService.getWidgetList()
            .then(function(data) {
                $scope.widgetsList = data;
            });

        $scope.widgetClick = function (widget) {
            $scope.selectedWidget = widget;
        };

        $scope.onTimeout = function() {
            milliseconds -= 1000;
            $scope.widgetTime = _millisecondsToTime(milliseconds);
            timeout = $timeout($scope.onTimeout, 1000);
        };

        $('#iframe').live('widget_status', function(e) {
            $scope.log = e.status.output;
            milliseconds = e.status.timeleftMillis;
            $cookieStore.put('instanceId', e.status.instanceId);

            _startTimer();
        });

        $('#iframe').live('stop_widget', function() {
            $scope.widgetTime = '';
            _stopTimer();
        });

        $('#iframe').live('prolong', function() {
            var data = {
                'leadId' : $cookieStore.get('leadId'),
                'instanceId' : $cookieStore.get('instanceId')
            };

            if (data.leadId !== undefined && data.instanceId !== undefined) {
                widgetService.prolong(data);
            }
        });

        function _startTimer() {
            _stopTimer();
            timeout = $timeout($scope.onTimeout, 1000);
        }

        function _stopTimer() {
            $timeout.cancel(timeout);
        }

        function _millisecondsToTime(milli)
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

        $('#selectedArrow').css({opacity: 0});
    });
