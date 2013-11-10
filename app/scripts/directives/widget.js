'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .directive('widget', function () {
        return {
            templateUrl: '/views/widgetSkin.html',
            restrict: 'A',
            scope: {
                selectedWidget: '=',
                requireAdvanced: '@',
                widgetTime: '='
            },
            controller:function($scope, $element, $location, $timeout, widgetService, SessionService, LeadService ){

                $scope.postUrl = 'http://' + window.conf.widgetServer;
                $scope.pageUrl = $location.protocol() + '://' + $location.host();
                $scope.play = false;
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
                var leadTimeLeft = LeadService.getTimeLeft();
                var isNewWidgetSelected = false;
                var firstPlayTick = true;
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
                                var data = SessionService.getSessionData();



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
                        SessionService.setInstanceId( msg.status.instanceId);
                        SessionService.setWidgetId( $scope.selectedWidget.id );


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
                                _sendProlong();
                            });
                        }

                        if (firstPlayTick) {
                            firstPlayTick = false;
                            SessionService.updateWidgetStatusTime('start', new Date().getTime());
                        }
                        $scope.play = msg.status.state !== 'STOPPED';

                        _startTimer();
                    },
                    'stop_widget': function() {
                        $scope.widgetTime = '';
                        firstPlayTick = true;
                        _stopTimer();
                    }
                };

                $scope.playWidget = function(){
                    if (!$scope.credentialsChecked() || leadTimeLeft === 0) {
                        return;
                    }

                    if (SessionService.getWidgetTimeUsed($scope.selectedWidget.id) >= 3600000) {
                        $scope.widgetLog = [$scope.selectedWidget.productName + ' widget free trial time expired'];
                        return;
                    }

                    $scope.play = true;
                    var iframe = $element.find('#iframe');
                    var postObj = {
                        name: 'play_widget'
                    };

                    if (_getAdvanced().project_name !== '' && _getAdvanced().hpcs_key !== '' && _getAdvanced().hpcs_secret_key !== '') {
                        postObj.advanced = _getAdvanced();
                        SessionService.setAdvancedData(_getAdvanced());
                    }
                    $scope.widgetLog = [];

                    $.postMessage(JSON.stringify(postObj), $scope.postUrl, iframe.get(0).contentWindow);
                };

                $scope.stopWidget = function() {
                    $scope.play = false;
                    SessionService.updateWidgetStatusTime('stop', new Date().getTime());
                    SessionService.removeInstanceId();
                    var iframe = $element.find('#iframe');

                    $.postMessage(JSON.stringify({name: 'stop_widget'}), $scope.postUrl, iframe.get(0).contentWindow);
                };

                $scope.hideAdvanced = function() {
                    return currentView === 'preview' || currentView === 'free';
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


                $scope.playEnabled = function(){
                    if ( $scope.selectedWidget === null ){
                        return false;
                    }
                    else if ( !$scope.requireAdvanced ){
                        return true;
                    }else if ( $scope.credentialsChecked() ){
                        return true;
                    }
                    return false;
                };


                $scope.onTimeout = function() {
                    milliseconds -= 1000;
                    $scope.widgetTime = milliseconds;
                    timeout = $timeout($scope.onTimeout, 1000);
                };

                $scope.$watch('selectedWidget', function(newWidget) {
                    if (newWidget !== null && leadTimeLeft !== 0) {
                        $scope.play = false;
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
                        project_name: $scope.advanced.project_name,
                        hpcs_key: $scope.advanced.hpcs_key,
                        hpcs_secret_key: $scope.advanced.hpcs_secret_key
                    };
                }

                function _startTimer() {
                    _stopTimer();
                    timeout = $timeout($scope.onTimeout, 1000);
                }

                function _stopTimer() {
                    $timeout.cancel(timeout);
                }

                function _sendProlong() {
                    var data = {
                        'leadId' : LeadService.getLead().id,
                        'instanceId' : SessionService.getInstanceId()
                    };

                    if (data.leadId !== undefined && data.instanceId !== undefined) {
                        widgetService.prolong(data);
                    }
                }

                function _scrollLog() {
                    var log = $element.find('#log')[0];
                    log.scrollTop = log.scrollHeight;
                }

                function _checkLeadTime() {
                    if (leadTimeLeft <= 0) {
                        $scope.playEnabled = false;
                        $scope.play = false;
                        $scope.widgetLog.push('Your free trial is over. <a href="#/signup">Click here</a> to get Cloudify');
                    }
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

                _checkLeadTime();
                if (SessionService.getAdvancedData() !== undefined) {
                    $scope.advanced = SessionService.getAdvancedData();
                }
            }
        };
    });
