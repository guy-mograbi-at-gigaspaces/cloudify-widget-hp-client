'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('SignupCtrl', function ($scope, $cookieStore, $location,widgetService) {
        $scope.currentStep = 3;

        $('#submitBtn').click(function() {
            var formData = {
                'fname' : $('#fname').val(),
                'lname' : $('#lname').val(),
                'email' : $('#email').val()
            };

            widgetService.updateLead(formData)
                .then(function(data) {
                    $cookieStore.put('leadId', data.id);
                    $cookieStore.put('formSubmitted', true);

                    var userData = {
                        'leadId' : data.id,
                        'instanceId' : $cookieStore.get('instanceId')
                    };

                    widgetService.prolong(userData);
                });

            toggleForms();
        });

        $('#codeSubmitBtn').click(function() {
            var codeFormData = {
                'code' : $.trim($('#code').val()),
                'leadId' : $cookieStore.get('leadId')
            };

            widgetService.validateCode(codeFormData, function() {
                $location.path('/registered');

            });
        });

        $('#switchToActivationForm, #switchToSignUpForm').click(function() {
            toggleForms();
        });

        function toggleForms() {
            $('#detailsForm').toggle();
            $('#codeForm').toggle();
        }

        if ($cookieStore.get('formSubmitted') === true) {
            toggleForms();
        }
    });
