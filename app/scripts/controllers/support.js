'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('SupportCtrl', function ($scope, $http, LeadService) {

        $scope.feedbackSent = false;
        $scope.feedbackSentError = false;
        $scope.feedbackSendProccess = false;

        $scope.feedbackData = {
            name: '',
            email:'',
            feedback: ''
        };

        function updateLead(){
            $scope.feedbackData = {
                name: LeadService.getName() ,
                email: LeadService.getEmail()
            };
        }

        LeadService.loadLeadFromSessionAsync().then( updateLead );

        $scope.sendFeedback = function() {
            $scope.feedbackSent = false;
            $scope.feedbackSentError = false;
            $scope.feedbackSendProccess = true;

            if (mixpanel.get_distinct_id() !== undefined) {
                mixpanel.identify($scope.feedbackData.leadMail);
                mixpanel.people.identify($scope.feedbackData.leadMail);
                mixpanel.track('HP Widget feedback', $scope.feedbackData);
            }

            $http.post('/backend/feedback', $scope.feedbackData)
                .then(function(result) {
                    $scope.feedbackSendProccess = false;
                    $scope.feedbackSent = true;

                    if (result.data === 'feedbackSent') {
                        $scope.feedbackData.feedback = '';
                    } else if (result.data === 'feedbackError') {
                        $scope.feedbackSentError = true;
                    }
                });
        };

        function _notEmptyString( str ){
            return str !== undefined && str !== null && $.trim(str.length) > 0;
        }

        $scope.isCurrentlySending = function(){
            return $scope.feedbackSendProcess;
        };


        $scope.getSendButtonText = function(){
            return $scope.feedbackSendProccess ? "Sending..." : "Send";
        };

        $scope.isSendActive = function() {
            return _notEmptyString($scope.feedbackData.name) &&
                _notEmptyString($scope.feedbackData.email) &&
                _notEmptyString($scope.feedbackData.feedback) &&
                $scope.feedbackSendProccess === false;
        };
    });
