'use strict';

angular.module('cloudifyWidgetHpClientApp')
  .directive('getNavigationBar', function () {
    return {
        template: '<div class="banner container">' +
            '<div class="navigation span8">' +
                '<ul>' +
                    '<li>' +
                        '<a href="#/demo">Demo</a>' +
                    '</li>' +
                    '<li>' +
                        '<a href="#/preview">Preview Cloudify</a>' +
                    '</li>' +
                    '<li>' +
                        '<a href="#/signup">Free Trial</a>' +
                    '</li>' +
                    '<li>' +
                        '<a href="#/registered">Run Cloudify</a>' +
                    '</li>' +
                    '<li>' +
                        '<a href="#/learn">Learn More</a>' +
                    '</li>' +
                    '<li>' +
                        '<a href="#/support">Get Support</a>' +
                    '</li>' +
                '</ul>' +
            '</div>' +
        '</div>',
        restrict: 'A'
    };
});
