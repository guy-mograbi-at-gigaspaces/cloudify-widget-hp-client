'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .service('stepsService', function stepsService(  $location ) {
        var steps = [
            {
                'url':'/demo',
                'number':1
            },
            {
                'url':'/preview',
                'number': 2

            },
            {
                'url':'/signup',
                'number':3
            },
            {
                'url':'/free',
                'number':3

            },
            {
                'url':'/registered',
                'number': 5,
                'showSteps':false
            }
        ];

        this.getStep = function() {
            var currentStep = this.currentStep();
            if ( !!currentStep ){
                return currentStep.number;
            }
        };

        this.currentStep = function() {
            var matchingSteps = $.grep(steps,function(step){
                return  step.url === $location.path();
            });
            return  matchingSteps.length > 0 ? matchingSteps[0] : null;
        };
    });
