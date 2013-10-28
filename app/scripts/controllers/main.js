'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('MainCtrl', function ($scope, $location) {

        $scope.redirectPage = function(pageName) {
            $location.path('/' + pageName);
        };

    });
