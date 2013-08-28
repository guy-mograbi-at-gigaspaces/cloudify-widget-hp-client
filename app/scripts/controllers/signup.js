'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('SignupCtrl', function ($scope, widgetService) {
        $scope.currentStep = 3;

        $(document).on('click', '#submitBtn', function() {
            var formData = {
                'fname' : $('#fname').val(),
                'lname' : $('#lname').val(),
                'email' : $('#email').val()
            };

            widgetService.updateLead(formData, function() {
                $(document).find('#checkMailPopup').show();
            });
        });
    });
