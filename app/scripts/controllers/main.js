'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('MainCtrl', function ($scope, $location) {

        $('#mainStepSeeDemo').click(function() {
            $scope.$apply(function() {
                $location.path("/demo");
            });
        });

        $('#mainStepRunPreview').click(function() {
            $scope.$apply(function() {
                $location.path("/preview");
            });
        });

        $('#mainStepSignup').click(function() {
            $scope.$apply(function() {
                $location.path("/signup");
            });
        });

        $('#mainStepRegistered').click(function() {
            $scope.$apply(function() {
                $location.path("/registered");
            });
        });

    });
