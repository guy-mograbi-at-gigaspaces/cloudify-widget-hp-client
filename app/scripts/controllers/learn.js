'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('LearnCtrl', function () {
        setInterval(function(){$('#learnIframeContainer').scrollTop(550);}, 1000);
    });
