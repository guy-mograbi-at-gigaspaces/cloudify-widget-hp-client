'use strict';

angular.module('cloudifyWidgetHpClientApp')
  .directive('getStepsBar', function () {
        return {
            template: '<ul id="stepsList">' +
                '<li id="step1"><div class="stepIcon">1</div>See the demo</li>' +
                '<li id="step2"><div class="stepIcon">2</div>Start free 60 min. preview</li>' +
                '<li id="step3"><div class="stepIcon">3</div>Signup for free 30 days trial</li>' +
              '</ul>',
            restrict: 'AE',
            link: function(scope, element) {
                var lis = $(element).find('li');

                for(var i = 1; i <= lis.length; i++) {
                    var elm = $(lis[i - 1]).find('div');

                    if (i < scope.currentStep) {
                        elm.addClass('done');
                    } else if (i === scope.currentStep){
                        elm.addClass('activeStep');
                    } else {
                        elm.removeClass('done');
                    }
                }

                // hide steps list if registration done
                scope.$watch('currentStep', function() {
                    if (scope.currentStep === 4) {
                        $('#stepsBar').hide();
                    }
                });
            }
        };
    });
