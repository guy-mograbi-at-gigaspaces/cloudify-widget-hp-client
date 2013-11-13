'use strict';

angular.module('cloudifyWidgetHpClientApp')
  .service('MixpanelService', function MixpanelService( LeadService ) {
    // AngularJS will instantiate a singleton by calling "new" on this function


        function _trackWidgetError( data ){
            if (mixpanel.get_distinct_id() !== undefined) {
                mixpanel.identify( LeadService.getEmail() );
                mixpanel.people.identify( LeadService.getEmail() );
                mixpanel.track('HP Widget error', data);
            }
        }

        function _setProperty( key, value, once ){
            if ( LeadService.isExists() ){ // set property only for leads
                mixpanel.identify( LeadService.getEmail() );
                mixpanel.people.identify( LeadService.getEmail() );
                if ( !!once ){
                    mixpanel.people.set( key , value );
                }else{
                    // set_once was only introduced after 2.1.. even though the documentation does not specify this
                    mixpanel.people.set( key , value );
                }
            }
        }

        function _setPropertyOnce( key,value ){
            _setProperty(key,value, true);
        }


        function _track(){
            mixpanel.track(arguments);
        }

        this.trackWidgetError = _trackWidgetError;
        this.setProperty = _setProperty;
        this.setPropertyOnce = _setPropertyOnce;
        this.track = _track;
    }
);
