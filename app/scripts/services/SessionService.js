'use strict';

angular.module('cloudifyWidgetHpClientApp')
  .service('SessionService', function SessionService( stepsService, $cookieStore ) {
        var StepsService = stepsService;
    // AngularJS will instantiate a singleton by calling "new" on this function
        var cookieName = 'hpwidgetsession';
        var leadMailKey = 'leadMail';
        var activationCodeKey = 'activationCode';
        var timeUsedByInstanceIdKey = 'timeUsedByInstanceId';
        var advancedDataKey = 'advancedData';
        var statusStop = 'stop';
        var statusStart = 'start';
        var cookieData = {};
        var useCookieStore = false;

        var COOKIE_EXPIRATION = 7;

        function _getCookieData(){
            cookieData.currentStep = StepsService.currentStep();
            return cookieData;
        }

        function _save() {
            var cookieData = _getCookieData();
            console.log(['saving', cookieData]);
            _saveCookie(cookieName, cookieData);
        }

        function _load(){
            return _loadCookie( cookieName ) || {};
        }
        cookieData = _load();
        console.log(['cookieData initialized to ', cookieData]);

        function _has( key ){
            return cookieData.hasOwnProperty(key) && cookieData[key] !== undefined && cookieData[key] !== null;
        }

        function _getSessionData(){
            return _getCookieData();
        }

        function _saveCookie(cookieName, cookieData) {
            if (useCookieStore) {
                $cookieStore.put( cookieName, cookieData );
            } else {
                $.cookie(cookieName, JSON.stringify(cookieData), {expires: COOKIE_EXPIRATION});
            }
        }

        function _loadCookie() {
            if (useCookieStore) {
                return $cookieStore.get( cookieName ) || {};
            } else {
                return eval("(" + $.cookie(cookieName) + ")");
            }
        }

        function _getTimeKey( instanceId ){
            return 'time_for_instance_' + instanceId;
        }

        function _getWidgetIdKey(){
            return 'widgetId_forStep_' + StepsService.currentStep().id;
        }

        function _getInstanceIdKey(){
            return 'instanceId_forStep_' + StepsService.currentStep().id;
        }

        function _set( key, value ){
            cookieData[key] = value;
            _save();
        }

        function _setInstanceId( instanceId ){
            _set(_getInstanceIdKey(), instanceId);
        }

        function _setWidgetId( widgetId ){ // the widget we are showing
            _set(_getWidgetIdKey(), widgetId);
        }

        function _get( key ){
            return _getCookieData()[key];
        }

        function _getInstanceId(){
            return _get( _getInstanceIdKey() );
        }

        function _hasInstanceId(){
            return _has( _getInstanceIdKey() );
        }

//        function _clearSession(){
//            cookieData = {};
//            _save();
//        }

        function _remove( key ){
            try{
                delete cookieData[key];
            }catch(e){
                console.log(['unable to delete instanceId', e]);
            }
            _save();
        }

        function setUseCookieStore(use) {
            useCookieStore = use;
        }

        function _removeInstanceId(){
            _remove(_getInstanceIdKey());
        }

//        function _removeLeadMail(){
//            _remove( leadMailKey );
//        }

//        function _removeLeadDetails(){
//            _removeLeadMail();
//        }

        function _setActivationCode( activationCode ){
            _set( activationCodeKey , activationCode );
        }

        function _hasWidgetId(){
            return _has(_getWidgetIdKey());
        }

        function _removeWidgetId(){
            _remove( _getWidgetIdKey() );
        }

        function _getWidgetId(){
            return _get( _getWidgetIdKey() );
        }

        function _hasLeadEmail(){
            return _has(leadMailKey);
        }

        function _setLeadEmail( email ){
            return  _set(leadMailKey, email);
        }

        function _getLeadEmail(){
            return _get(leadMailKey);
        }

        function _getActivationCode(){
            return _get(activationCodeKey);
        }

        function _removeLeadEmail(){
            return _remove(leadMailKey);
        }

        // safely get entry for time used by instanceId
        function _getTimeUsedByInstanceId( instanceId ){
            if (!cookieData.hasOwnProperty(timeUsedByInstanceIdKey)){
                cookieData[timeUsedByInstanceIdKey] = {};
            }

            if (!cookieData[timeUsedByInstanceIdKey].hasOwnProperty(_getTimeKey(instanceId))) {
                cookieData[timeUsedByInstanceIdKey][_getTimeKey(instanceId)] = { };
            }

            return cookieData[timeUsedByInstanceIdKey][_getTimeKey(instanceId)];
        }

        function _updateTimeUsed( instanceId, status, time) {

            var data =  _getTimeUsedByInstanceId( instanceId );
            if ( status === 'start' || status === 'stop' ){
                data[status] = time;
            }else{
                console.log(['unknown status', status]);
            }
            _save();
        }

        function _getTimeUsed() {
            try {

                var timeUsed = 0;
                var startTime = 0;
                var stopTime = 0;
                var timeUsedIndex = null;
                var timeUsedItem = null;
                for (timeUsedIndex in cookieData[timeUsedByInstanceIdKey]) {
                    if (cookieData[timeUsedByInstanceIdKey].hasOwnProperty(timeUsedIndex)) {
                        timeUsedItem = cookieData[timeUsedByInstanceIdKey][timeUsedIndex];
                        if (timeUsedItem.hasOwnProperty(statusStart) && timeUsedItem.hasOwnProperty(statusStop)) {
                            startTime = timeUsedItem[statusStart];
                            stopTime = timeUsedItem[statusStop];
                            if (stopTime > startTime) {
                                timeUsed = timeUsed + stopTime - startTime;
                            }
                        }
                    }
                }
                return timeUsed;

            } catch (e) {
                console.log(['unable to calculate time used', e]);
            }
            return 0;
        }


        function _setAdvancedData( data ){
            return  _set(advancedDataKey, data);
        }

        function _getAdvancedData(){
            return _get(advancedDataKey);
        }

        function _clearAdvancedData(){
            return _remove(advancedDataKey);
        }

        this.getSessionData = _getSessionData;

        this.hasInstanceId = _hasInstanceId;
        this.setInstanceId = _setInstanceId;
        this.getInstanceId = _getInstanceId;
        this.removeInstanceId = _removeInstanceId;


        this.setWidgetId = _setWidgetId;
        this.hasWidgetId = _hasWidgetId;
        this.removeWidgetId = _removeWidgetId;
        this.getWidgetId = _getWidgetId;

        this.hasLeadEmail = _hasLeadEmail;
        this.setLeadEmail = _setLeadEmail;
        this.getLeadEmail = _getLeadEmail;
        this.removeLeadEmail = _removeLeadEmail;

        this.setAdvancedData = _setAdvancedData;
        this.getAdvancedData = _getAdvancedData;
        this.clearAdvancedData = _clearAdvancedData;

        this.getActivationCode = _getActivationCode;
        this.setActivationCode = _setActivationCode;

        this.updateTimeUsed = _updateTimeUsed;
        this.getTimeUsed = _getTimeUsed;
    });
