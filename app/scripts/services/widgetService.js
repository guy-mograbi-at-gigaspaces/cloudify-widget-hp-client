'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .service('widgetService', function widgetService($http) {

        var widgets = [];
//        var userData = {};

        this.getWidgetList = function(callback) {
            // load widgets list from API
            //  api/user/<email>/widget/list

            $http.get('/widgetslist')
                .success(function(data) {
                    widgets = data;
                    callback(widgets);
                });

            return widgets;
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