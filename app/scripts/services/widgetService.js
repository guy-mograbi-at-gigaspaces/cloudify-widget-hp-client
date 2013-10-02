'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .service('widgetService', function widgetService($http) {

        // load widgets list from API
        this.getWidgetList = function() {
            return $http.get('/backend/widgetslist')
                .then(function(data) {
                    return data.data;
                });
        };

        // update API with user lead data
        this.updateLead = function(leadData) {
            var data = JSON.stringify(leadData);

            return $http.post('/backend/lead', data)
                .then(function(data) {
                    return data.data;
                });
        };

        // load user data (and extended widget validation) from API
        this.getLead = function() {
            return $http.get('/backend/lead/list')
                .then(function(data) {
                    return data.data;
                });
        };

        // validate code
        this.validateCode = function(code) {
            return $http.post('/backend/validate', code)
                .then(function(data) {
                    return data.data;
                });
        };

        // extend widget time for specific user
        this.prolong = function(userData) {
            return $http.post('/backend/prolong', userData)
                .then(function(data) {
                    return data.data;
                });
        };
    });