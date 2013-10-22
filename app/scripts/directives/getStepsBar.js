'use strict';

angular.module('cloudifyWidgetHpClientApp')
  .directive('getStepsBar', function () {
        return {
            template: '<div class="stepsWrapper"><ul id="stepsList">' +
                '<li class="step{{step.index}}" ng-repeat="step in steps"><div class="stepIcon" ng-class="stepClass(step)">{{step.index}}</div>{{step.label}}</li>' +
              '</ul></div>',
            restrict: 'AE',
            scope:{
                currentStep:'='
            },
            link: function(scope, element) {

                scope.steps = [
                    { 'index': '1', 'label': 'See the demo' },
                    { 'index': '2', 'label': 'Start free 60 min. preview' },
                    { 'index': '3', 'label': 'Signup for free 30 days trial' }
                ];

                scope.stepClass = function( step ){

                    if ( step.index < scope.currentStep  ){
                        return 'done';
                    }else if ( step.index === scope.currentStep ){
                        return 'activeStep activeText';
                    }
                };
            }
        };
    });
