'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('SupportCtrl', function ($scope, $cookieStore, $http) {

        $scope.feedbackSent = false;
        $scope.feedbackSentError = false;
        $scope.feedbackSendProccess = false;

        $scope.feedbackData = {
            name: '',
            email: '',
            feedback: ''
        };

        if ($cookieStore.get('leadMail') !== undefined) {
            $scope.feedbackData.email = $cookieStore.get('leadMail');
        }

        if ($cookieStore.get('leadFName') !== undefined && $cookieStore.get('leadLName') !== undefined) {
            $scope.feedbackData.name = $cookieStore.get('leadFName') + ' ' + $cookieStore.get('leadLName');
        }

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
                        $scope.feedbackData.feedback = '';
                    }
                });
        };

        $scope.isSendActive = function() {
            return $scope.feedbackData.name !== undefined && $scope.feedbackData.name.length > 0 &&
                $scope.feedbackData.email !== undefined && $scope.feedbackData.email.length > 0 &&
                $scope.feedbackData.feedback !== undefined && $scope.feedbackData.feedback.length > 0 &&
                $scope.feedbackSendProccess === false;
        };
    });
