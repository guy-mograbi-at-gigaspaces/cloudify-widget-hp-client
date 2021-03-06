'use strict';

$(function () {

    var postUrl = "http://" + conf.widgetServer;
    var currentView = this.location.hash.substr(2);

    $(document).bind('DOMSubtreeModified',function(e) {
        if (e.target.id === 'play_btn') {
            setPlayEventHandling();
            $(document).unbind('DOMSubtreeModified');
        }
    });

    $('#play_btn').live('click', function() {
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
        $.postMessage(JSON.stringify(postObj), postUrl, iframe.get(0).contentWindow);
    });

    $('#stop_btn').live('click', function () {
        var iframe = $('#iframe');

        updateButtonState('stop');

        $.postMessage(JSON.stringify({name: 'stop_widget'}), postUrl, iframe.get(0).contentWindow);
    });

    $('input[name="project_name"], input[name="hpcs_key"], input[name="hpcs_secret_key"]').live('change', function () {
        if (credentialsChecked()) {
            $('#play_btn').removeClass('disabled');
        } else {
            $('#play_btn').addClass('disabled');
        }
    });

    $('#iframe').live('widget_change', function() {
        updateButtonState('stop');
    });

    function setPlayEventHandling() {
        $('#play_btn').on('click', function() {});
    }

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
                    $('#iframe').trigger({
                        type: 'widget_log',
                        html: msg.message,
                        class: msg.type
                    });
                    $log.scrollTop($log[0].scrollHeight);

                    if (msg.type == 'error') {
                        $('#iframe').trigger({
                            type: "error",
                            status: msg.status
                        });
                    }
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
                } else if (msg.name === 'play_widget') {
                    $('#iframe').trigger({
                        type: 'play_widget',
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