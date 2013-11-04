'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('PreviewCtrl', function ($scope, $location, $timeout, $cookieStore, widgetService, stepsService) {

        $scope.currentStep = stepsService.getStep($location.path());
        $scope.leadMail = $cookieStore.get('leadMail');
        $scope.selectedWidget = null;
        $scope.widgetTime = '';
        $scope.conf = window.conf;
        $scope.widgetsList = [];

        widgetService.getWidgetList()
            .then(function(data) {
                $scope.widgetsList = data;
                if ($scope.currentStep === 4) {
                    _loadLead();
                }
            });

        $scope.widgetClick = function (widget) {
            if ($scope.currentStep === 4 &&
                $cookieStore.get('instanceId') !== null &&
                $cookieStore.get('instanceId') !== undefined) {
                return;
            }
            $scope.widgetTime = '';
            $scope.selectedWidget = widget;
        };

        $scope.signout = function() {
            $cookieStore.remove('leadId');
            $cookieStore.remove('instanceId');
            $cookieStore.remove('leadMail');
            $location.path('/signup');
        };

        $scope.activate = function() {
            $location.path('/signup');
        };

        $scope.parseTrialTime = function() {
            var leadTimeLeft = $cookieStore.get('leadTimeLeft');
            var days = Math.floor(leadTimeLeft / (1000 * 60 * 60 * 24));
            var timeToDisplay = '';

            if (days > 0) {
                timeToDisplay = 'in ' + days + ' Days';
            } else {
                timeToDisplay = 'today';
            }

            return timeToDisplay;
        };

        function _loadLead() {
            widgetService.getLead({'leadMail' : $cookieStore.get('leadMail')})
                .success(function(data) {
                    if (data.widget !== null) {
                        $cookieStore.put('leadWidget', data.widget);
                        $scope.selectedWidget = _findWidgetInList(data.widget);
                    }
                    if (data.leadExtraTimeout !== null) {
                        $cookieStore.put('leadTimeLeft', data.leadExtraTimeout);
                    }
                });
        }

        function _findWidgetInList(widgetToFind) {
            for (var i = 0; i < $scope.widgetsList.length; i++ ) {
                if ($scope.widgetsList[i].id === widgetToFind.id) {
                    return $scope.widgetsList[i];
                }
            }
        }
    });
