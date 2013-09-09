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
            link: function(scope, element) {
                var lis = $(element).find('li');

                for(var i = 0; i < lis.length - 1; i++) {
                    var elm = lis[i];
                    if (i <= scope.currentStep) {
                        $(elm).addClass('done');
                    } else {
                        $(elm).removeClass('done');
                    }
                }

                scope.$watch("model", function() {
                    console.log("Changed");
                    if (scope.currentStep === 4) {
                        $(element).find('#stepsList').css('visibility', 'hidden');
                    }
                });
            }
        };
    });
