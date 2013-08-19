'use strict';

describe('Directive: getFooter', function () {
  beforeEach(module('cloudifyWidgetHpClientApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<get-footer></get-footer>');
    element = $compile(element)($rootScope);
    expect(element).not.toBe(undefined);
  }));
});
