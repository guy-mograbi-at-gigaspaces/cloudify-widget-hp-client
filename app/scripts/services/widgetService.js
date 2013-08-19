'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .service('widgetService', function widgetService($http) {

        var widgets = [];
    //        var userData = {};

        this.getWidgetList = function() {
            // load widgets list from API
            //  api/user/<email>/widget/list

            $http.get('http://launch.cloudifysource.org/demos/133/list')
                .success(function(data) {
                    console.log(data);
                    widgets = data;
                });

            return widgets;

    //            return [{id: 1, name: 'widget1'}, {id: 2, name: 'widget2'}];
        };

        this.updateLead = function(/*userData*/) {
            // update API with user lead data
            //  api/user/<userId>/lead
        };

        this.getLead = function(/*userEmail*/) {
            // load user data (and extended widget validation) from API
            //  api/user/<userId>/email
        };
    });