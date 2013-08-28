'use strict';

describe('Directive: getStepsBar', function () {
  beforeEach(module('cloudifyWidgetHpClientApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<get-steps-bar></get-steps-bar>');
    element = $compile(element)($rootScope);
      expect(element).not.toBe(undefined);
  }));
});
