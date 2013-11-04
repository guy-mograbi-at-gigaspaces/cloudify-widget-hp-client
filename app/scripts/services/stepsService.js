'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .service('stepsService', function stepsService() {
        var currentStep = 0;

        this.getStep = function(path) {
            this.updateStep(path);
            return currentStep;
        };

        this.updateStep = function(path) {
            if (path === '/preview') {
                currentStep = 2;
            } else if (path === '/free') {
                currentStep = 4;
            } else if (path === '/registered') {
                currentStep = 5;
            }
        };
    });
