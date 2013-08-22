'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .service('widgetService', function widgetService($http) {

        var widgets = [];
//        var userData = {};

        this.getWidgetList = function(callback) {
            // load widgets list from API
            //  api/user/<email>/widget/list

            $http.get('/backend/widgetslist')
                .success(function(data) {
                    widgets = data;
                    callback(widgets);
                });

            return widgets;
        };

        this.updateLead = function(leadData, callback) {
            // update API with user lead data
            //  api/user/<userId>/lead

            var data = JSON.stringify(leadData);

            $http.post('/backend/lead', data)
                .success(function() {
                    callback();
                });
        };

        this.getLead = function(/*userEmail*/) {
            // load user data (and extended widget validation) from API
            //  api/user/<userId>/email
        };
    });