'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .directive('layout', function () {
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
                        '<div id="footer">' +
                        '<div id="stepsBar" current-step="currentStep" get-steps-bar></div>' +
                       '</div></div>',
            restrict: 'A',
            replace:true,
            transclude: true,
            scope:{
                currentStep:'@'
            },
            link: function postLink(scope, element, attrs) {
                console.log(["current step is",scope.currentStep, attrs]);
                scope.$watch('currentStep', function(){ console.log(["detected changes",arguments])})
            }
        };
    });
