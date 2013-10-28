'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('SupportCtrl', function ($scope, $cookieStore, $http) {
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
            $http.post('/backend/feedback', $scope.feedbackData);
        };
    });
