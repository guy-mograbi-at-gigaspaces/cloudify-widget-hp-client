'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('SignupCtrl', function ($scope, $cookieStore, $location, widgetService) {
        $scope.showDetailsForm = $cookieStore.get('leadMail') === undefined;
        $scope.isSubmitActive = false;
        $scope.activated = false;
        $scope.formData = {};

        $scope.signupSubmitClick = function() {
            if (!$scope.isSubmitActive()) {
                return;
            }

            mixpanel.identify($scope.formData.email);
            mixpanel.people.identify($scope.formData.email);
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
            mixpanel.track('Signup', $scope.formData);

            $cookieStore.put('leadMail', $scope.formData.email);
            $cookieStore.put('leadFName', $scope.formData.fname);
            $cookieStore.put('leadLName', $scope.formData.lname);
            $cookieStore.put('agreeTerms', $scope.formData.agreeTerms);

            widgetService.updateLead($scope.formData)
                .then(function(data) {
                    $cookieStore.put('leadId', data.id);
                    $cookieStore.put('formSubmitted', true);

                    if (data.widget !== null) {
                        $cookieStore.put('leadWidget', data.widget);
                    }

                    var userData = {
                        'leadId' : data.id,
                        'instanceId' : $cookieStore.get('instanceId')
                    };

                    widgetService.prolong(userData);
                });

            $scope.toggleForms();
        };

        $scope.codeSubmitClick = function() {
            if (!$scope.isLoginActive()) {
                return;
            }

            var codeFormData = {
                'code' : $.trim($scope.formData.activationCode),
                'leadId' : $cookieStore.get('leadId')
            };

            $cookieStore.put('activationCode', $scope.formData.activationCode);

            widgetService.validateCode(codeFormData, function() {
                $scope.activated = true;
            });

            $location.path('/free');
        };

        $scope.toggleForms = function() {
            $scope.showDetailsForm = !$scope.showDetailsForm;
        };

        $scope.isSubmitActive = function(){
            return $scope.formData.fname !== undefined && $scope.formData.fname.length > 0 &&
                $scope.formData.lname !== undefined && $scope.formData.lname.length > 0 &&
                $scope.formData.email !== undefined && $scope.formData.email.length > 0 &&
                $scope.formData.agreeTerms !== undefined && $scope.formData.agreeTerms;
        };

        $scope.isLoginActive = function(){
            return $scope.formData.activationCode !== undefined && $scope.formData.activationCode.length > 0 && $scope.formData.email !== undefined && $scope.formData.email.length > 0 && $scope.formData.agreeTerms;

        };

        if ($cookieStore.get('formSubmitted') === true) {
            $scope.toggleForms();
        }

        if ($cookieStore.get('leadMail') !== undefined) {
            $scope.formData = {
                'fname':  $cookieStore.get('leadFName'),
                'lname':  $cookieStore.get('leadLName'),
                'email':  $cookieStore.get('leadMail')
            };

            if ($cookieStore.get('activationCode') !== undefined) {
                $scope.formData.activationCode = $cookieStore.get('activationCode');
            }

            if ($cookieStore.get('agreeTerms') !== undefined) {
                $scope.formData.agreeTerms = $cookieStore.get('agreeTerms');
            }
        }
    });
