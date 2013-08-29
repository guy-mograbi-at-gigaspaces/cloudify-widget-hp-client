'use strict';

describe('Directive: getFooter', function () {
    beforeEach(module('cloudifyWidgetHpClientApp'));

    var element;

    beforeEach(inject(function ($rootScope, $compile) {
        element = angular.element('<div get-footer></get-div>');
        element = $compile(element)($rootScope);
    }));

    it('should make hidden element visible', function() {
        expect(element).not.toBeUndefined();
    });
});
