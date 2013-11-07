'use strict';

describe('Service: MixpanelService', function () {

  // load the service's module
  beforeEach(module('cloudifyWidgetHpClientApp'));

  // instantiate service
  var MixpanelService;
  beforeEach(inject(function (_MixpanelService_) {
    MixpanelService = _MixpanelService_;
  }));

  it('should do something', function () {
    expect(!!MixpanelService).toBe(true);
  });

});
