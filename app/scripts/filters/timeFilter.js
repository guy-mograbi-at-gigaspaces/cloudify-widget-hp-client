'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .filter('timeFilter', function () {
        return function (input, mode) {
            var filteredTime = '';
            var seconds = Math.floor((input / 1000) % 60);
            var minutes = Math.floor((input / (60 * 1000)) % 60);
            var days = Math.floor(input / (1000 * 60 * 60 * 24));

            if (seconds < 0 || minutes < 0) {
                seconds = '--';
                minutes = '--';
            }

            if (days > 0) {
                filteredTime = days + ' Days';
            } else {
                if (mode === 'daysOnly') {
                    filteredTime = 'Today';
                } else {
                    filteredTime = minutes + ':' + (seconds < 10 ? '0' : '') + seconds + ' Min.';
                }
            }

            return filteredTime;
        };
    });
