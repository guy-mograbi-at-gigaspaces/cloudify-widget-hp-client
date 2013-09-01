'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('SignupCtrl', function ($scope, widgetService) {
        $scope.currentStep = 3;

        $('#submitBtn').click(function() {
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
