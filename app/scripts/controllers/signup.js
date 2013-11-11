'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('SignupCtrl', function ($scope, $location, widgetService, LeadService, SessionService, MixpanelService ) {
        $scope.hasActivationCode = false; // todo : replace this with simple "phase" : signup, activate, loggedin
        $scope.isSubmitActive = false;
        $scope.activated = false;
        $scope.loginError = null;
        $scope.loginInProgress = false; // todo : use this to show the user we are thinking
        $scope.formData = {};

        $scope.alreadyHasActivationCode = function( value ){
            $scope.hasActivationCode = value;
        };

        $scope.signupSubmitClick = function() {
            if (!$scope.isSubmitActive()) {
                return;
            }

            LeadService.signup( $scope.formData).then(function( lead ){
                SessionService.setLeadId( lead.id );

                MixpanelService.setProperty( '$created', new Date() );
                MixpanelService.setProperty( '$first_name', $scope.formData.fname );
                MixpanelService.setProperty( 'First Name', $scope.formData.fname );
                MixpanelService.setProperty( '$last_name', $scope.formData.lname );
                MixpanelService.setProperty( 'Last Name', $scope.formData.lname );
                MixpanelService.setProperty( 'Signup date', $scope.formData.lname );
                MixpanelService.setPropertyOnce( 'resource', 'appCatalogUser' );
                MixpanelService.setPropertyOnce( '$email', $scope.formData.email );
                MixpanelService.track('Signup', $scope.formData);


            });

            // now the user should have an activation code
            $scope.hasActivationCode = true;
        };

        $scope.codeSubmitClick = function() {
            if (!$scope.isLoginActive()) {
                return;
            }

            LeadService.getLeadIdAsync($scope.formData.email).then(
                function(leadId) {
                    if (leadId === null) {
                        $scope.loginError = 'unknown email'; // TODO : handle error no such lead
                    } else {
                        var codeFormData = {
                            'code' : $.trim($scope.formData.activationCode),
                            'leadId' : leadId
                        };

                        $scope.loginInProgress = true;
                        widgetService.validateCode(codeFormData).then( function( success /* true/false */ ) {
                            if ( !!success ){
                                SessionService.setActivationCode( $.trim($scope.formData.activationCode) );
                                LeadService.updateLead();
                                $scope.loginInProgress = false;
                                $location.path('/free');
                            } else {
                                // TODO : handle error - code invalid
                            }
                        });
                    }
                }
            );
        };

        $scope.showDetailsForm = function() {
            return !$scope.hasActivationCode;
        };

        $scope.isSubmitActive = function () {
            return _isNotEmptyString($scope.formData.fname) &&
                _isNotEmptyString($scope.formData.lname) &&
                _isNotEmptyString($scope.formData.email) && !!$scope.formData.agreeTerms;
        };

        $scope.isLoginActive = function() {
            return _isNotEmptyString( $scope.formData.activationCode) && _isNotEmptyString($scope.formData.email);
        };

        function _isNotEmptyString(str) {
            return str !== undefined && str !== null && $.trim(str).length > 0;
        }

        function updateLead() {
            if (LeadService.isExists()) {
                var lead = LeadService.getLead();
                $scope.formData = {
                    'fname': lead.firstName,
                    'lname': lead.lasName,
                    'email': lead.email,
                    'activationCode': SessionService.getActivationCode()
                };
                $scope.hasActivationCode = true;
            }
        }

        updateLead();
    });
