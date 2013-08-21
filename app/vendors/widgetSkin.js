'use strict';

$(function () {

    var postUrl = 'http://latestwidget.gsdev.info';

        $(document).on('click', '#play_btn', function () {
        var iframe = $('#iframe');
        var postObj = {name: 'play_widget'};
        if (getAdvanced().project !== '' && getAdvanced().key !== '' && getAdvanced().secretKey !== '') {
            postObj.advanced = getAdvanced();
        }

        updateButtonState('play');

        $.postMessage(JSON.stringify(postObj), postUrl, iframe.get(0).contentWindow);
    });

    $(document).on('click', '#stop_btn', function () {
        var iframe = $('#iframe');

        updateButtonState('stop');

        $.postMessage(JSON.stringify({name: 'stop_widget'}), postUrl, iframe.get(0).contentWindow);
    });

    $('#embed-code-box').hide();
    $('#embed-code-box').val($.trim($('#embed-code-box').val()));

    $(document).on('click', '#embed_btn', function () {
        $('#embed-code-box').toggle();
    });
    $(document).on('click', '#embed-code-box .close', function () {
        $('#embed-code-box').hide();
    });

    function getAdvanced() {
        var $advanced = $('#advanced');
        var $project = $advanced.find('[name=project_name]');
        var $key = $advanced.find('[name=hpcs_key]');
        var $secretKey = $advanced.find('[name=hpcs_secret_key]');

        return {project: $project.val(), key: $key.val(), secretKey: $secretKey.val()};
    }

    function updateButtonState(state) {
        if (state === 'play') {
            $('#stop_btn').show();
            $('#play_btn').hide();
        } else if (state === 'stop') {
            $('#stop_btn').hide();
            $('#play_btn').show();
        }
    }

    $.receiveMessage(function (e) {
            try {
                var msg = JSON.parse(e.data);
                var $log = $('#log');

                if (msg.name === 'write_log') {
                    $log.append($('<li/>', {html: msg.html}).addClass(msg.className));
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
                    updateButtonState(msg.status.state === 'STOPPED' ? 'stop' : 'play');
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