'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .directive('widget', function () {
        return {
            templateUrl: '/views/widgetSkin.html',
            restrict: 'A',
            scope: {
                selectedWidget: '=',
                currentStep: '=',
                widgetTime: '='
            },
            controller:function($scope, $element, $location, $cookieStore, $timeout, widgetService){

                $scope.postUrl = 'http://' + window.conf.widgetServer;
                $scope.pageUrl = $location.protocol() +'://' + $location.host();
                $scope.play = false;
                $scope.playEnabled = $scope.currentStep === 2 && $scope.selectedWidget !== null;
                $scope.advanced = {
                    project_name: '',
                    hpcs_key: '',
                    hpcs_secret_key: ''
                };
                $scope.manageUrl = null;
                $scope.consoleUrl = null;
                $scope.widgetLog = [];

                var currentView = $location.url().substr(1);
                var timeout = 0;
                var milliseconds = 0;
                var isNewWidgetSelected = false;
                var handlers = {
                    'widget_log': function(e) {
                        if (isNewWidgetSelected) {
                            return;
                        }

                        $scope.$apply(function() {
                            var msg = JSON.parse(e.data);

                            if (msg.message.charAt(0) === '.') {
                                $scope.widgetLog.pop();
                                $scope.widgetLog.push(msg.message);
                            } else {
                                $scope.widgetLog.splice($scope.widgetLog.length - 1, 0, msg.message);
                            }

                            if (msg.type === 'important') {
                                $scope.widgetLog.pop();
                            }

                            if (msg.type === 'error') {
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

                                if (mixpanel.get_distinct_id() !== undefined) {
                                    mixpanel.identify(data.leadMail);
                                    mixpanel.people.identify(data.leadMail);
                                    mixpanel.track('HP Widget error', data);
                                }

                                widgetService.reportError(data);
                            }
                        });
                        _scrollLog();
                    },
                    'set_advanced': function(e) {
                        var msg = JSON.parse(e.data);
                        $scope.advanced.project_name = msg.project;
                        $scope.advanced.hpcs_key = msg.key;
                        $scope.advanced.hpcs_secret_key = msg.secretKey;
                    },
                    'widget_status': function(e) {
                        var msg = JSON.parse(e.data);
                        milliseconds = msg.status.timeleftMillis;
                        $cookieStore.put('instanceId', msg.status.instanceId);

                        if (msg.status.publicIp !== null) {
                            $scope.manageUrl = 'http://' + msg.status.publicIp + ':8099/';
                        } else {
                            $scope.manageUrl = null;
                        }

                        if (msg.status.instanceIsAvailable === true) {
                            $scope.consoleUrl = msg.status.consoleLink.url;
                        } else {
                            $scope.consoleUrl = null;
                        }

                        if (isNewWidgetSelected) {
                            $scope.$apply(function() {
                                $scope.widgetLog = msg.status.output;
                                isNewWidgetSelected = false;
                            });
                        }

                        $scope.play = msg.status.state === 'STOPPED' ? false : true;

                        _startTimer();
                    },
                    'stop_widget': function() {
                        $scope.widgetTime = '';
                        _stopTimer();
                    }
                };

                $scope.playWidget = function(){
                    if (!$scope.credentialsChecked()) {
                        return;
                    }

                    $scope.play = true;
                    var iframe = $element.find('#iframe');
                    var postObj = {name: 'play_widget'};
                    if (_getAdvanced().project !== '' && _getAdvanced().key !== '' && _getAdvanced().secretKey !== '') {
                        postObj.advanced = _getAdvanced();
                    }
                    $scope.widgetLog = [];

                    _sendProlong();
                    $.postMessage(JSON.stringify(postObj), $scope.postUrl, iframe.get(0).contentWindow);
                };

                $scope.stopWidget = function() {
                    $scope.play = false;
                    var iframe = $element.find('#iframe');

                    $.postMessage(JSON.stringify({name: 'stop_widget'}), $scope.postUrl, iframe.get(0).contentWindow);
                };

                $scope.isPreview = function() {
                    return currentView === 'preview';
                };

                $scope.credentialsChecked = function() {
                    if ((currentView === 'registered' &&
                        $scope.advanced.project_name.length > 0 &&
                        $scope.advanced.hpcs_key.length > 0 &&
                        $scope.advanced.hpcs_secret_key.length > 0) ||
                        currentView !== 'registered' && !$scope.play) {
                        return true;
                    } else {
                        return false;
                    }
                };

                $scope.advancedChange = function() {
                    $scope.playEnabled = $scope.credentialsChecked() && $scope.currentStep === 4;
                };

                $scope.onTimeout = function() {
                    milliseconds -= 1000;
                    $scope.widgetTime = _millisecondsToTime(milliseconds);
                    timeout = $timeout($scope.onTimeout, 1000);
                };

                $scope.$watch('selectedWidget', function(newWidget) {
                    if (newWidget !== null) {
                        $scope.play = false;
                        $scope.playEnabled = true;
                        $scope.widgetTime = '';
                        $scope.manageUrl = null;
                        $scope.consoleUrl = null;
                        $scope.widgetLog = [];
                        isNewWidgetSelected = true;
                        _stopTimer();
                    }
                });

                function _getAdvanced() {
                    return {
                        project: $scope.advanced.project_name,
                        key: $scope.advanced.hpcs_key,
                        secretKey: $scope.advanced.hpcs_secret_key
                    };
                }

                function _startTimer() {
                    _stopTimer();
                    timeout = $timeout($scope.onTimeout, 1000);
                }

                function _stopTimer() {
                    $timeout.cancel(timeout);
                }

                function _millisecondsToTime(milli) {
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

                function _sendProlong() {
                    var data = {
                        'leadId' : $cookieStore.get('leadId'),
                        'instanceId' : $cookieStore.get('instanceId')
                    };

                    if (data.leadId !== undefined && data.instanceId !== undefined) {
                        widgetService.prolong(data);
                    }
                }

                function _scrollLog() {
                    var log = $element.find('#log')[0];
                    log.scrollTop = log.scrollHeight;
                }

                $.receiveMessage(function (e) {
                    var msg = JSON.parse(e.data);

                    if (handlers.hasOwnProperty(msg.name)) {
                        try {
                            handlers[msg.name](e);
                        } catch (exception) {
                            console.log(['problem invoking callback for ', e, exception]);
                        }
                    }
                });
            }
        };
    });
