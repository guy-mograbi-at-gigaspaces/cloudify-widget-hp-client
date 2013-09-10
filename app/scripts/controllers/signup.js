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
                toggleForms();
            });
        });

        $('#codeSubmitBtn').click(function() {
            var codeFormData = {
                'code' : $('#code').val()
            };

            widgetService.updateCode(codeFormData, function() {
                // where to send the userId + code to ??
            });
        });

        $('#switchToActivationForm, #switchToSignUpForm').click(function() {
            toggleForms();
        });

        function toggleForms() {
            $('#detailsForm').toggle();
            $('#codeForm').toggle();
        }
    });
