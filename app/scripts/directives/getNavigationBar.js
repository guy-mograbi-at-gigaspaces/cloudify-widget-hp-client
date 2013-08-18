'use strict';

angular.module('cloudifyWidgetHpClientApp')
  .directive('getNavigationBar', function () {
    return {
        template: '<div class="banner container">' +
            '<a href="#/">' +
                '<div class="logo span2">' +
                    'HP Logo' +
                '</div>' +
            '</a>' +
            '<div class="navigation span8">' +
                '<ul>' +
                    '<li>' +
                        '<a href="#/demo">See Demo</a>' +
                    '</li>' +
                    '<li>' +
                        '<a href="#/preview">60 Min. Free Preview</a>' +
                    '</li>' +
                    '<li>' +
                        '<a href="#/signup">Sign up for Free Trial</a>' +
                    '</li>' +
                    '<li>' +
                        '<a href="#/learn">Learn More</a>' +
                    '</li>' +
                    '<li>' +
                        '<a href="#/support">Support</a>' +
                    '</li>' +
                '</ul>' +
            '</div>' +
        '</div>',
        restrict: 'A'
    };
});
