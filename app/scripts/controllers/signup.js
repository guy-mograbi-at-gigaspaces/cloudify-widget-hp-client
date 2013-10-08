'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('SignupCtrl', function ($scope, $cookieStore, $location, widgetService) {
        $scope.currentStep = 3;


        $('#submitBtn').click(function() {
            var formData = {
                'fname' : $('#fname').val(),
                'lname' : $('#lname').val(),
                'email' : $('#email').val()
            };

//            mixpanel.alias(formData.email);
            mixpanel.identify(formData.email);
            mixpanel.people.identify( formData.email );
            mixpanel.people.set({
                '$created': new Date(),
                '$first_name':formData.fname,
                '$last_name':formData.lname,
                'First name': formData.fname,
                'Last name': formData.lname,
                'Signup date': new Date(),
                'resource':'appCatalogUser',
                '$email': formData.email
            });
            mixpanel.register({gender: 'male'});
            mixpanel.track('Signup', formData );

            $cookieStore.put('leadMail', formData.email);

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
