'use strict';

$(function () {

    var postUrl = "http://" + conf.widgetServer;
    var currentView = this.location.hash.substr(2);

    $(document).on('click', '#play_btn', function () {
        if (!credentialsChecked()) {
            return;
        }

        var iframe = $('#iframe');
        var postObj = {name: 'play_widget'};
        if (getAdvanced().project !== '' && getAdvanced().key !== '' && getAdvanced().secretKey !== '') {
            postObj.advanced = getAdvanced();
        }

        updateButtonState('play');

        $('#iframe').trigger({type: "prolong"});
        $('#log').html('');

        $.postMessage(JSON.stringify(postObj), postUrl, iframe.get(0).contentWindow);
    });

    $(document).on('click', '#stop_btn', function () {
        var iframe = $('#iframe');

        updateButtonState('stop');

        $.postMessage(JSON.stringify({name: 'stop_widget'}), postUrl, iframe.get(0).contentWindow);
    });

    $(document).on('change', 'input[name="project_name"], input[name="hpcs_key"], input[name="hpcs_secret_key"]', function () {
        if (credentialsChecked()) {
            $('#play_btn').removeClass('disabled');
        } else {
            $('#play_btn').addClass('disabled');
        }
    });

    function getAdvanced() {
        var $advanced = $('#advanced');
        var $project = $advanced.find('[name=project_name]');
        var $key = $advanced.find('[name=hpcs_key]');
        var $secretKey = $advanced.find('[name=hpcs_secret_key]');

        return {project: $project.val(), key: $key.val(), secretKey: $secretKey.val()};
    }

    function updateButtonState(state) {
        if (state === 'play' && credentialsChecked()) {
            $('#stop_btn').show();
            $('#play_btn').hide();
        } else if (state === 'stop') {
            $('#stop_btn').hide();
            $('#play_btn').show();
        }
    }

    function credentialsChecked() {
        if ((currentView === 'registered' &&
            $('input[name="project_name"]').val().length > 0 &&
            $('input[name="hpcs_key"]').val().length > 0 &&
            $('input[name="hpcs_secret_key"]').val().length > 0)
            || currentView !== 'registered' && !$('#play_btn').hasClass('disabled')) {
            return true;
        } else {
            return false;
        }
    }

    $.receiveMessage(function (e) {
            try {
                var msg = JSON.parse(e.data);
                var $log = $('#log');
                if (msg.name === 'widget_log') {
                    // todo - dispatch this to angularJS..
                    $log.append($('<li/>', {html: msg.message, class:msg.type}));
                    $log.scrollTop($log[0].scrollHeight);
                } else if (msg.name === 'set_advanced') {
                    var $advanced = $('#advanced');
                    var $project = $advanced.find('[name=project_name]');
                    var $key = $advanced.find('[name=hpcs_key]');
                    var $secretKey = $advanced.find('[name=hpcs_secret_key]');

                    $project.val(msg.project);
                    $key.val(msg.key);
                    $secretKey.val(msg.secretKey);
                } else if (msg.name === 'widget_status') {
                    $('#iframe').trigger({
                        type: "widget_status",
                        status: msg.status
                    });

                    updateButtonState(msg.status.state === 'STOPPED' ? 'stop' : 'play');
                } else if (msg.name === 'stop_widget') {
                    $('#iframe').trigger({
                        type: "stop_widget",
                        status: msg.status
                    });
                }
            } catch (exception) {
                console.log(['problem invoking callback for ', e, exception]);
            }
        },
        function () {
            return true;
        }
    );

    updateButtonState('stop');
});