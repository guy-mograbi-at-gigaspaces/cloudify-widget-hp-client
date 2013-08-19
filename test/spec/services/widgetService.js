'use strict';

describe('Service: widgetService', function () {

  // load the service's module
  beforeEach(module('cloudifyWidgetHpClientApp'));

  // instantiate service
  var widgetService;
  beforeEach(inject(function (_widgetService_) {
    widgetService = _widgetService_;
  }));

  it('should do something', function () {
    expect(!!widgetService).toBe(true);
  });

});
