'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('SignupCtrl', function (widgetService) {
        $(document).on('click', '#submitBtn', function() {

            var formData = {
                'fname' : $('#fname').val(),
                'lname' : $('#lname').val(),
                'email' : $('#email').val()
            };

            widgetService.updateLead(formData, function(res) {
                console.log(res);
                // if success: $(document).find('#checkMailPopup').show();
            });
        });
    });
