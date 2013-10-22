'use strict';

angular.module('cloudifyWidgetHpClientApp')
  .directive('getNavigationBar', function ( $location ) {
    return {
        template: '<div class="banner container">' +
            '<div class="navigation span8">' +
                '<ul>' +
                    '<li ng-repeat="page in pages" ng-class="{\'active\':isActive(page)}">' +
                        '<a href="#{{page.path}}">{{page.label}}</a>' +
                    '</li>' +
                '</ul>' +
            '</div>' +
        '</div>',
        restrict: 'A',
        scope:true,
        link: function( scope ){
            scope.pages = [
                { 'label':'Demo', 'path':'/demo' },
                { 'label':'Preview Cloudify', 'path':'/preview' },
                { 'label':'Free Trial', 'path':'/signup' },
                { 'label':'Run Cloudify', 'path':'/registered' },
                { 'label':'Learn More', 'path':'/learn' },
                { 'label':'Get Support', 'path':'/support' }
            ];
            scope.isActive = function( page ){
                return page.path === scope.currentPath;
            };
            scope.$watch(function(){ return $location.path(); }, function(){
                scope.currentPath = $location.path();
            });

        }
    };
});
