'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .service('widgetService', function widgetService($http) {

        var widgets = [];
        var leads = [];

        // load widgets list from API
        this.getWidgetList = function(callback) {
            $http.get('/backend/widgetslist')
                .success(function(data) {
                    widgets = data;
                    callback(widgets);
                });

            return widgets;
        };

        // update API with user lead data
        this.updateLead = function(leadData, callback) {
            var data = JSON.stringify(leadData);

            $http.post('/backend/lead', data)
                .success(function(data) {
                    console.log(data);
                    callback(data);
                });
        };

        // load user data (and extended widget validation) from API
        this.getLead = function(callback) {
            $http.get('/backend/lead/list')
                .success(function(data) {
                    leads = data;
                    callback(leads);
                });

            return leads;
        };

        // validate code
        this.validateCode = function(code, callback) {
            $http.post('/backend/validate', code)
                .success(function(data) {
                    console.log(data);
                    callback();
                });
        };

        // extend widget time for specific user
        this.prolong = function(userData, callback) {
            $http.post('/backend/prolong', userData)
                .success(function(data) {
                    console.log(data);
                    callback();
                });
        };
    });