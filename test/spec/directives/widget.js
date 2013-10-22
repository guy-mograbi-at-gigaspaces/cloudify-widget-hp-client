'use strict';

describe('Directive: widget', function () {
  beforeEach(module('cloudifyWidgetHpClientApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<widget></widget>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the widget directive');
  }));
});
