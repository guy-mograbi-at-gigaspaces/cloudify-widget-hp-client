'use strict';

angular.module('cloudifyWidgetHpClientApp')
  .service('SessionService', function SessionService( stepsService, $cookieStore ) {
        var StepsService = stepsService;
    // AngularJS will instantiate a singleton by calling "new" on this function
        var cookieName = 'hpwidgetsession';
        var cookieData = {};
        var leadMailKey = 'leadMail';
        var activationCodeKey = 'activationCode';


        function _getCookieData(){
            cookieData.currentStep = StepsService.currentStep();
            return cookieData;
        }

        function _save() {
            var cookieData = _getCookieData();
            console.log(['saving', cookieData]);
            $cookieStore.put( cookieName, cookieData );
        }

        function _load(){
            return $cookieStore.get( cookieName ) || {};
        }
        cookieData = _load();
        console.log(['cookieData initialized to ', cookieData]);

        function _has( key ){
            return cookieData.hasOwnProperty(key) && cookieData[key] !== undefined && cookieData[key] !== null;
        }

        function _getSessionData(){
            return _getCookieData;
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

        this.getActivationCode = _getActivationCode;
        this.setActivationCode = _setActivationCode;
    });
