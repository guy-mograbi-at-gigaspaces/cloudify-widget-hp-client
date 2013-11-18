'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .directive('widget', function ( MixpanelService ) {
        return {
            templateUrl: '/views/widgetSkin.html',
            restrict: 'A',
            scope: {
                selectedWidget: '=',
                requireAdvanced: '@',
                widgetTime: '=',
                subtitles:'=',
                requireLead:'@',
                unlimited:'=',
                upid:'=' // unique page id - for widget caching, we want each page to have a separate cookie, otherwise they will share sessions.
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


                var timeout = 0;
                var milliseconds = 0;
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

                                MixpanelService.trackWidgetError( data );
                                widgetService.reportError(data);
                            }
                            _scrollLog();
                        });
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
                            if ( SessionService.hasInstanceId() ){
                                SessionService.updateTimeUsed( SessionService.getInstanceId(), 'start', new Date().getTime());
                            }
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

                function isRequireLead(){
                    return $scope.requireLead === 'true';
                }

                function isRequireAdvanced(){
                    return $scope.requireAdvanced === 'true';
                }

                $scope.playWidget = function(){


                    if ( isRequireAdvanced() && $scope.credentialsChecked() ){

                        MixpanelService.setPropertyOnce('hpSiteUserAdvanced','true');
                    }else{
                        MixpanelService.setPropertyOnce('hpSiteUserSimple','true');
                    }

                    if (!$scope.credentialsChecked() || _isLeadTimeExpired() ) {
                        return;
                    }

                    var oneHour = 1000 * 60 * 60; // our timelimit;
                    if (SessionService.getTimeUsed() >= oneHour ) {
                        $scope.widgetLog = ['You have used the 60 minutes preview time.'];
                        return;
                    }

                    $scope.play = true;
                    var iframe = $element.find('#iframe');
                    var postObj = {
                        name: 'play_widget'
                    };

                    // translate advanced to whatever the postMessage to give the widget.
                    if ( hasAdvancedCredentials() ) {
                        postObj.advanced = { 'project' : $scope.advanced.project_name, 'key' : $scope.advanced.hpcs_key ,'secretKey' : $scope.advanced.hpcs_secret_key};
                        //SessionService.setAdvancedData(_getAdvanced());
                    }else if ( isRequireAdvanced() ){
                        console.log(['error, require advanced, but no advanced data, and still running play function.. wat?', $scope.advanced]);
                        return;
                    }
                    $scope.widgetLog = [];

                    console.log(['posting', postObj ]);
                    $.postMessage(JSON.stringify(postObj), $scope.postUrl, iframe.get(0).contentWindow);
                };

                $scope.stopWidget = function() {
                    $scope.play = false;
                    if ( SessionService.hasInstanceId() ){
                        SessionService.updateTimeUsed( SessionService.getInstanceId(), 'stop', new Date().getTime());
                    }
                    SessionService.removeInstanceId();
                    var iframe = $element.find('#iframe');

                    $.postMessage(JSON.stringify({name: 'stop_widget'}), $scope.postUrl, iframe.get(0).contentWindow);
                };

                $scope.hideAdvanced = function() {
                    return !isRequireAdvanced();
                };

                function _isNotEmptyString(str) {
                    return str !== undefined && str !== null && $.trim(str).length > 0;
                }

                function hasAdvancedCredentials() {
                    return _isNotEmptyString($scope.advanced.project_name) &&
                        _isNotEmptyString($scope.advanced.hpcs_key) &&
                        _isNotEmptyString($scope.advanced.hpcs_secret_key);
                }

                $scope.credentialsChecked = function() {
                    return  !isRequireAdvanced() || hasAdvancedCredentials();
                };

                $scope.playEnabled = function(){
                    if ( $scope.selectedWidget === null ){
                        return false;
                    }
                    else if ( _isLeadTimeExpired() ){
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
                    if (newWidget !== null && !_isLeadTimeExpired()) {
                        $scope.play = false;
                        $scope.widgetTime = '';
                        $scope.manageUrl = null;
                        $scope.consoleUrl = null;
                        $scope.widgetLog = [];
                        isNewWidgetSelected = true;
                        _stopTimer();
                    }
                });


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

                function _isLeadTimeExpired(){
                    return isRequireLead() && typeof(LeadService.getTimeLeft()) !== 'undefined' && LeadService.getTimeLeft() <= 0;
                }

                $scope.leadTimeExpired = _isLeadTimeExpired ;

                $scope.isPlaying = function(){
                    return !_isLeadTimeExpired() && $scope.play;
                };


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

//                if (SessionService.hasAdvancedData() !== undefined) {
//                    $scope.advanced = SessionService.getAdvancedData();
//                }
            }
        };
    });
