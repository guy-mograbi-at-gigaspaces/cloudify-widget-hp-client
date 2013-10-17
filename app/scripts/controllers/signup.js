'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('SignupCtrl', function ($scope, $cookieStore, $location, widgetService) {
        $scope.currentStep = 3;
        $scope.isValidating = false;
        $scope.formData = {};

        $('#submitBtn').click(function() {
            mixpanel.identify($scope.formData.email);
            mixpanel.people.identify( $scope.formData.email );
            mixpanel.people.set({
                '$created': new Date(),
                '$first_name':$scope.formData.fname,
                '$last_name':$scope.formData.lname,
                'First name': $scope.formData.fname,
                'Last name': $scope.formData.lname,
                'Signup date': new Date(),
                'resource':'appCatalogUser',
                '$email': $scope.formData.email
            });
            mixpanel.register({gender: 'male'});
            mixpanel.track('Signup', $scope.formData );

            $cookieStore.put('leadMail', $scope.formData.email);

            widgetService.updateLead($scope.formData)
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
            if ($scope.isValidating) {
                return;
            }

            $scope.isValidating = true;

            var codeFormData = {
                'code' : $.trim($('#code').val()),
                'leadId' : $cookieStore.get('leadId')
            };

            widgetService.validateCode(codeFormData, function() {
                $scope.isValidating = false;
            });

            $location.path('/registered');
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
