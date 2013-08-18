'use strict';

angular.module('cloudifyWidgetHpClientApp')
  .directive('getNavigationBar', function () {
    return {
        template: '<div class="banner container">' +
            '<div class="logo span2">' +
                'HP Logo' +
            '</div>' +
            '<div class="navigation span8">' +
                '<ul>' +
                    '<li>' +
                        '<a href="#">See Demo</a>' +
                    '</li>' +
                    '<li>' +
                        '<a href="#">60 Min. Free Preview</a>' +
                    '</li>' +
                    '<li>' +
                        '<a href="#">Sign up for Free Trial</a>' +
                    '</li>' +
                    '<li>' +
                        '<a href="#">Learn More</a>' +
                    '</li>' +
                    '<li>' +
                        '<a href="#">Support</a>' +
                    '</li>' +
                '</ul>' +
            '</div>' +
        '</div>',
        restrict: 'A'
    };
});
