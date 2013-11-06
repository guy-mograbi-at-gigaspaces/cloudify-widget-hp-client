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
        this.getLead = function(leadData) {
            return $http({
                url: '/backend/lead/list',
                method: 'GET',
                params: leadData
            });
        };

        // validate code
        this.validateCode = function(code) {
            return $http.post('/backend/validate', code)
                .then(function(data) {
                    console.log(["after validating",data]); // lets leave this print..
                    return data.data.hasOwnProperty('email'); // we will get
                });
        };

        // extend widget time for specific user
        this.prolong = function(userData) {
            return $http.post('/backend/prolong', userData)
                .then(function(data) {
                    return data.data;
                });
        };

        // report widget error
        this.reportError = function(userData) {
            return $http.post('/backend/reportError', userData)
                .then(function(data) {
                    return data.data;
                });
        };
    });