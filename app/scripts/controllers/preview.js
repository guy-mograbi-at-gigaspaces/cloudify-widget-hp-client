'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('PreviewCtrl', function ($scope, $location, $timeout, widgetService, stepsService, LeadService, SessionService  ) {
        var StepsService = stepsService;
        var currentStep = stepsService.currentStep();

        $scope.leadMail = LeadService.getEmail();
        $scope.selectedWidget = null;

        $scope.widgetTime = '';
        $scope.conf = window.conf;
        $scope.widgetsList = [];


        function _selectWidget( widget ){
            $scope.selectedWidget = widget;
        }

        $scope.showLeadEmail = function(){
            return !!currentStep.requiresLogin;
        };


        $scope.getSubtitles= function(){
            return !currentStep.subtitles ? [] : currentStep.subtitles;
        };

        $scope.requireAdvanced = function(){
            return !!currentStep.requireAdvancedCredentials;
        };

        if ( StepsService.currentStep().requiresLogin && !LeadService.isExists() ){
            $location.path('/signup');
        }

        widgetService.getWidgetList()
            .then(function(data) {
                $scope.widgetsList = data;
                if( SessionService.hasWidgetId ){
                    _selectWidget( _findWidgetInList(SessionService.getWidgetId()));
                }
            });

        $scope.widgetClick = function (widget) {
            if ( !!currentStep.singleWidget &&
                SessionService.hasInstanceId() ) {
                return;
            }
            $scope.widgetTime = '';
            $scope.selectedWidget = widget;
        };

        $scope.signout = function() {
            LeadService.signout();
            SessionService.removeLeadEmail();

            $location.path('/signup');
        };

        $scope.showAdvancedInstructions = function(){
            return !!currentStep.showAdvancedInstructions;
        };

        $scope.showInstructions = function(){
            return !!currentStep.showInstructions;
        };

        $scope.showSignupLink=function(){
            return !!currentStep.showSignupLink;
        };

        $scope.activate = function() {
            $location.path('/signup');
        };

        $scope.parseTrialTime = function() {
            var leadTimeLeft = LeadService.getTimeLeft();
            var days = Math.floor(leadTimeLeft / (1000 * 60 * 60 * 24));
            var timeToDisplay = '';

            if (days > 0) {
                timeToDisplay = 'in ' + days + ' Days';
            } else {
                timeToDisplay = 'today';
            }

            return timeToDisplay;
        };

        function _findWidgetInList( widgetId ) {
            var result = $.grep( $scope.widgetsList, function(item){
                return item.id === widgetId;
            });
            return result.length > 0 ? result[0] : null;
        }
    });
