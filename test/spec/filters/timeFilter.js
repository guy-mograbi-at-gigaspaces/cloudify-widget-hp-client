'use strict';

describe('Filter: timeFilter', function () {

  // load the filter's module
  beforeEach(module('cloudifyWidgetHpClientApp'));

  // initialize a new instance of the filter before each test
  var timeFilter;
  beforeEach(inject(function ($filter) {
    timeFilter = $filter('timeFilter');
  }));

});
