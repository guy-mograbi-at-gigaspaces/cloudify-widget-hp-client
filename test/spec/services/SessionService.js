'use strict';

describe('Service: SessionService', function () {

        // load the service's module
        beforeEach(module('cloudifyWidgetHpClientApp'));

        // instantiate service
        var SessionService;
        beforeEach(inject(function (_SessionService_) {
            SessionService = _SessionService_;
        }));

        it('should keep lead email', function () {
            expect(!!SessionService).toBe(true);
            SessionService.setLeadEmail('abcde');
            expect(SessionService.getLeadEmail()).toBe('abcde');


        });


        it ('should calculate time by instanceId', function() {

            //classic scenario
            SessionService.updateTimeUsed( 5 , 'start', 5 );
            SessionService.updateTimeUsed( 5 , 'stop', 10 );

            expect(SessionService.getTimeUsed()).toBe(5);

            // missing stop scenario
            SessionService.updateTimeUsed( 6 , 'start', 5 );
            expect(SessionService.getTimeUsed()).toBe(5);

            // adding the missing stop
            SessionService.updateTimeUsed( 6 , 'stop', 10 );
            expect(SessionService.getTimeUsed()).toBe(10);


            //missing start
            SessionService.updateTimeUsed( 7 , 'stop', 10 );
            expect(SessionService.getTimeUsed()).toBe(10);

            //invalid value should have no effect
            SessionService.updateTimeUsed( 7 , 'start', 'nonsense' );
            expect(SessionService.getTimeUsed()).toBe(10);


        });

    }
);
