'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .service('stepsService', function stepsService(  $location ) {

        /**
         * ID - is a unique identifier that should not change.
         *      We should use it for cookie storage only! nothing else.
         *
         * URL - the url this step applies for
         *
         * Number - the number for the steps bar
         *
         * showsSteps - whether we should show steps or not
         *
         * singleWidget - whether we allows multiple widget running in parallel
         *
         * unlimited - whether there is not time limit. true iff no time limit.
         * @type {Array}
         */
        var steps = [
            {
                'url':'/demo',
                'number':1,
                'id':1

            },
            {
                'url':'/preview',
                'number': 2,
                'singleWidget':true,
                'id':2,
                'showInstructions':true,
                'showSignupLink':true,
                'subtitles' :[
                    'Run one service to preview the Catalog on HP Cloud',
                    'To run additional services, please use your HP Cloud account <a href="#/registered">here</a>. '
                ]

            },
            {
                'url':'/signup',
                'number':3,
                'id':3
            },
            {
                'url':'/free',
                'number':3,
                'hasLead':true,
                'singleWidget': true,
                'requiresLogin': true,
                'id':4,
                'showInstructions':true ,
                'showSignupLink':false ,
                'subtitles': [
                    'Run any service from the left panel - FREE for 7 days',
                    'To run another service, you must first close the currently running service before spinning up the new instance',
                    'To run multiple services simultaneously, please use your HP Cloud account <a href="#/registered">here</a>.'
                ]

            },
            {
                'url':'/registered',
                'number': 5,
                'showSteps':false ,
                'unlimited':true,
                'id':5,
                'showAdvancedInstructions':true,
                'requireAdvancedCredentials':true
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
