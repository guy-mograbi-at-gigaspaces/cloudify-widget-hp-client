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
        $scope.manageUrl = null;
        $scope.widgetLog = [];

        widgetService.getWidgetList()
            .then(function(data) {
                $scope.widgetsList = data;
            });

        $scope.widgetClick = function (widget) {
            $scope.widgetLog = [];
            $scope.selectedWidget = widget;
            $('#iframe').trigger({type: 'widget_change'});
        };

        $scope.onTimeout = function() {
            milliseconds -= 1000;
            $scope.widgetTime = _millisecondsToTime(milliseconds);
            timeout = $timeout($scope.onTimeout, 1000);
        };

        $('#iframe').live('widget_status', function(e) {
            milliseconds = e.status.timeleftMillis;
            $cookieStore.put('instanceId', e.status.instanceId);

            if (e.status.publicIp !== null) {
                $scope.manageUrl = 'http://' + e.status.publicIp + ':8099/';
            } else {
                $scope.manageUrl = null;
            }

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

        $('#iframe').live('error', function() {
            var data = {};

            if ($cookieStore.get('leadId') !== undefined) {
                data.leadId = $cookieStore.get('leadId');
            }

            if ($cookieStore.get('instanceId') !== undefined) {
                data.instanceId = $cookieStore.get('instanceId');
            }

            if ($cookieStore.get('leadMail') !== undefined) {
                data.leadMail = $cookieStore.get('leadMail');
            }

            widgetService.reportError(data);
        });

        $('#iframe').live('widget_log', function(log) {
            $scope.$apply(function() {
                if (log.html.charAt(0) === '.') {
                    $scope.widgetLog.pop();
                    $scope.widgetLog.push(log.html);
                } else {
                    $scope.widgetLog.splice($scope.widgetLog.length - 2, 0, log.html);
                }
            });
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
