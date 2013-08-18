'use strict';

angular.module('cloudifyWidgetHpClientApp')
  .directive('getFooter', function () {
    return {
        template:'<section class="homepage-social">' +
              '<a class="icon facebook" href="https://www.facebook.com/HPCloud">Facebook</a>' +
              '<a class="icon linkedin" href="http://www.linkedin.com/company/2591355">LinkedIn</a>' +
              '<a class="icon twitter" href="https://twitter.com/hpcloud">Twitter</a>' +
              '<a class="icon youtube" href="http://www.youtube.com/hpcloud">YouTube</a>' +
              '<a class="icon email last" href="mailto:sales@hpcloud.com">Email</a>' +
            '</section>' +
            '<section class="openstack-text-container">' +
                '<br><p class="homepage-openstack">The OpenStack™ Word Mark and OpenStack Logo are either registered trademarks/service marks or trademarks/service marks of OpenStack, LLC, in the United States and other countries and are used with OpenStack LLCs permission. We are not affiliated with, endorsed or sponsored by OpenStack LLC, the OpenStack Advisory Board, or the OpenStack community.</p><p></p>' +
            '</section>' +

            '<footer class="wrapper container">' +
                '<nav>' +
                    '<dl>' +
                        '<dt><a href="https://www.hpcloud.com/">Products</a></dt>' +
                        '<dd><a href="https://account.hpcloud.com/signup">Sign Up</a></dd>' +
                        '<dd><a href="https://www.hpcloud.com/need_to_know">Things to know</a></dd>' +
                        '<dd><a href="https://www.hpcloud.com/products">All Products</a></dd>' +
                        '<dd><a href="https://www.hpcloud.com/partners">Partners</a></dd>' +
                    '</dl>' +
                    '<dl>' +
                        '<dt><a href="http://docs.hpcloud.com">Documentation</a></dt>' +
                        '<dd><a href="http://docs.hpcloud.com">Compute</a></dd>' +
                        '<dd><a href="http://docs.hpcloud.com/object-storage">Object Storage</a></dd>' +
                        '<dd><a href="http://docs.hpcloud.com/cli">CLI</a></dd>' +
                        '<dd><a href="http://docs.hpcloud.com/bindings">Bindings</a></dd>' +
                    '</dl>' +
                    '<dl>' +
                        '<dt><a href="https://community.hpcloud.com/">Community</a></dt>' +
                        '<dd><a href="https://blog.hpcloud.com">Blog</a></dd>' +
                        '<dd><a href="https://community.hpcloud.com/forum">Forum</a></dd>' +
                        '<dd><a href="https://community.hpcloud.com/knowledge-base">Knowledge Base</a></dd>' +
                        '<dd><a href="https://community.hpcloud.com/status">System Status</a></dd>' +
                    '</dl>' +
                    '<dl>' +
                        '<dt><a href="https://console.hpcloud.com/">Console</a></dt>' +
                        '<dd><a href="https://console.hpcloud.com/dashboard">Dashboard</a></dd>' +
                        '<dd><a href="https://console.hpcloud.com/compute">Compute</a></dd>' +
                        '<dd><a href="https://console.hpcloud.com/object_store">Object Storage</a></dd>' +
                        '<dd><a href="https://account.hpcloud.com">Account</a></dd>' +
                    '</dl>' +
                    '<dl>' +
                        '<dt>About Us</dt>' +
                        '<dd><a href="https://www.hpcloud.com/about-us">About HP Cloud</a></dd>' +
                        '<dd><a href="http://hp.com/cloud">HP Converged Cloud</a></dd>' +
                        '<dd><a href="http://hp.com/">hp.com</a></dd>' +
                        '<dd><a href="https://www.hpcloud.com/jobs">Careers</a></dd>' +
                    '</dl>' +
                    '<dl>' +
                        '<dt>Contact</dt>' +
                        '<dd>' +
                            '1-855-61CLOUD<br>' +
                            '(855-612-5683)<br>' +
                            'Intl: +1678-745-9010<br>' +
                        '</dd>' +
                        '<dd><a href="https://www.hpcloud.com/contact_us">Contact Us</a></dd>' +
                    '</dl>' +
                '</nav>' +
                '<div id="content-info" role="contentinfo">' +
                    '<div class="container">' +
                        '<div class="grid_1">' +
                            '<ul>' +
                                '<li><a href="http://welcome.hp.com/country/us/en/privacy.html" target="_blank">Privacy Statement</a></li>' +
                                '<li><a href="http://www8.hp.com/us/en/privacy/terms-of-use.html" target="_blank">Terms of Use</a></li>' +
                                '<li><a href="https://www.hpcloud.com/legal_docs">HP Cloud Services Legal Documents</a></li>' +
                                '<li><a href="https://www.hpcloud.com/jobs" title="Jobs at HP Cloud">Jobs</a></li>' +
                                '<li><a href="https://www.hpcloud.com/contact_us">Contact Us</a></li>' +
                            '</ul>' +
                        '</div>' +
                        '<div class="grid_2 align-right">' +
                            '©' +
                            '2013' +
                            'Hewlett-Packard Development Company, L.P.' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</footer>',
        restrict: 'A'
    };
});
