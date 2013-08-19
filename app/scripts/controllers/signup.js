'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('SignupCtrl', function () {
        $(document).on('click', '#submitBtn', function() {
            $(document).find('#checkMailPopup').show();
        });
    });
