'use strict';

angular.module('cloudifyWidgetHpClientApp')
  .service('LeadService', function LeadService( SessionService, $http, widgetService, $q, $rootScope  ) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var lead = {};
        var leadLoadedEvent = 'leadLoaded';

        function _alreadyLoaded(){
            return lead.hasOwnProperty('id');
        }

        function _loadLeadFromSession(){
            if ( SessionService.hasLeadEmail() ){

                // check if already loaded
                if ( _alreadyLoaded() && lead.hasOwnProperty('email') && lead.email === SessionService.getLeadEmail()) {
                    var deferred = $q.defer();
                    deferred.resolve( _getLead() );
                    return deferred.promise;
                } else { // not loaded, need to load first
                    lead.email = SessionService.getLeadEmail();
                    return _loadLeadByEmail( SessionService.getLeadEmail()).then(function(){$rootScope.$broadcast(leadLoadedEvent);});
                }
            }
            return null;
        }

        function _getName(){
            return lead && lead.extra && lead.extra.fname + ' ' + lead.extra.lname || null;
        }

        function _signout(){
            lead = {};
        }

        function _getEmail(){
            return lead.email;
        }

//        function _needsToSignup(){
//            return !lead.hasOwnProperty('id');
//        }

        function _getTimeLeft(){
            return lead.leadExtraTimeout;
        }

        function _getLead(){
            return lead;
        }

        function _setLead( _lead ){
            lead = _lead;
        }

        function _isLoaded(){
            return lead.hasOwnProperty('email');
        }

        function _loadLeadByEmail( email ) {
            var deferred = $q.defer();

            widgetService.getLead({'leadMail' :email})
                .success(function(data) {
                    _setLead( data );
                    SessionService.setLeadEmail( lead.email );
                    deferred.resolve(_getLead());
                });
            return deferred.promise;
        }

        function _loadLeadFromSessionAsync(){
            var deferred = $q.defer();
            var loader = _loadLeadFromSession();
            if ( loader === null ){
                deferred.reject('no lead in session');
            } else {
                loader.then(function(){
                    deferred.resolve( _getLead());
                });
            }
            return deferred.promise;
        }

        function _getLeadIdAsync(email){
            var deferred = $q.defer();

            if (_isLoaded && $.trim(_getEmail()) === $.trim(email)) {
                deferred.resolve( lead.id );
            } else {
                _loadLeadByEmail( email).then(function( lead ){
                    // todo :handle error
                    deferred.resolve(lead.id);
                });
            }
            return deferred.promise;
        }

        function _signup(formData) {
            return widgetService.updateLead( formData).then(function(_lead){
                lead = _lead;
            });
        }

        function _updateLead() {
            _loadLeadByEmail(lead.email);
        }

        this.leadLoadedEvent = leadLoadedEvent;
        this.isExists = _isLoaded;
        this.getEmail =_getEmail;
        this.getTimeLeft = _getTimeLeft;
        this.signup = _signup;
        this.getLead = _getLead;
        this.getLeadIdAsync = _getLeadIdAsync;
        this.getName = _getName;
        this.loadLeadFromSessionAsync = _loadLeadFromSessionAsync;
        this.signout = _signout;
        this.updateLead = _updateLead;

        _loadLeadFromSession();
    });
