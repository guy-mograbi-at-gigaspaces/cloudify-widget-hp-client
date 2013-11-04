'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .directive('layout', function ( stepsService) {
        return {
            template: '<div class="body">'+
                        '<div id="content-wrapper" class="body" >' +
                            '<div id="header">' +
                                '<div id="main-header" onclick="window.location = \'/\';"></div>' +
                                '<div get-navigation-bar id="main-menu" class="hp-header"></div>' +
                            '</div>' +
                            '<div id="content" ng-transclude></div>' +
                            '<div id="push"></div>' +
                        '</div>' +
                        '<div id="footer" ng-class="{\'hidden\':showSteps == false}">' +
                        '<div id="stepsBar" current-step="{{currentStep}}" get-steps-bar></div>' +
                       '</div></div>',
            restrict: 'A',
            replace:true,
            transclude: true,
            controller: function($scope){
                var currentStep = stepsService.currentStep();
                if ( !!currentStep ){
                    $scope.showSteps = currentStep.showSteps;
                    $scope.currentStep = currentStep.number;
                }else{
                    $scope.showSteps = false;
                }

            }

        };
    });
