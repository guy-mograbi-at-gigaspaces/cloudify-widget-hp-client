'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('SignupCtrl', function ($scope, $cookieStore, $location, widgetService) {
        $scope.currentStep = 3;
        $scope.showDetailsForm = true;
        $scope.isValidating = false;
        $scope.isSignedUp = false;
        $scope.activated = false;
        $scope.formData = {};

        $scope.signupSubmitClick = function() {
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
            $cookieStore.put('leadFName', $scope.formData.fname);
            $cookieStore.put('leadLName', $scope.formData.lname);
            $scope.isSignedUp = true;

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

            $scope.toggleForms();
        };

        $scope.codeSubmitClick = function() {
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
                $scope.activated = true;
            });

            $location.path('/registered');
        };

        $scope.codeSkipClick = function() {
            $location.path('/free');
        };

        $scope.toggleForms = function() {
            $scope.showDetailsForm = $scope.showDetailsForm === true ? false : true;
        };

        if ($cookieStore.get('formSubmitted') === true) {
            $scope.toggleForms();
        }

        if ($cookieStore.get('leadMail') !== undefined) {
            $scope.formData = {
                'fname':  $cookieStore.get('leadFName'),
                'lname':  $cookieStore.get('leadLName'),
                'email':  $cookieStore.get('leadMail')
            }
            $scope.isSignedUp = true;
        }
    });
