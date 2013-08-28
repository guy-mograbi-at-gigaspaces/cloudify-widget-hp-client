'use strict';

angular.module('cloudifyWidgetHpClientApp')
  .directive('getStepsBar', function () {
        return {
            template: '<ul id="stepsList">' +
                  '<li id="step1">See the demo</li>' +
                  '<li id="step2">Start free 60 min. preview</li>' +
                  '<li id="step3">Signup for free 30 days trial</li>' +
              '</ul>',
            restrict: 'AE',
            link: function(scope) {
                var doc = $(document);

                for(var i = 1; i <= doc.find('#stepsList').children().length; i++) {
                    var elm = doc.find('#step' + i);

                    if (i <= scope.currentStep) {
                        elm.addClass('done');
                    } else {
                        elm.removeClass('done');
                    }
                }

                if (scope.currentStep == 4) {
                    doc.find('#stepsList').css('visibility', 'hidden');
                }
            }
        };
    });
