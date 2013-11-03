'use strict';

describe('Service: stepsService', function () {

  // load the service's module
  beforeEach(module('cloudifyWidgetHpClientApp'));

  // instantiate service
  var stepsService;
  beforeEach(inject(function (_stepsService_) {
    stepsService = _stepsService_;
  }));

  it('should do something', function () {
    expect(!!stepsService).toBe(true);
  });

});
