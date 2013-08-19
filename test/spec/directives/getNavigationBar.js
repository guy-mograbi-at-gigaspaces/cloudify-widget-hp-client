'use strict';

describe('Directive: getNavigationBar', function () {
  beforeEach(module('cloudifyWidgetHpClientApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<get-navigation-bar></get-navigation-bar>');
    element = $compile(element)($rootScope);
    expect(element.length).toBe(1);
  }));
});
