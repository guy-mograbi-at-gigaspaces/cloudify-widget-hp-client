'use strict';

describe('Directive: getStepsBar', function () {
    beforeEach(module('cloudifyWidgetHpClientApp'));

    var DemoCtrl,
        scope,
        route,
        compile,
        location,
        controller,
        element;

    beforeEach(inject(function ($controller, $rootScope, $route, $compile, $location) {
        scope = $rootScope.$new();
        compile = $compile;
        location = $location;
        controller = $controller;
        route = $route;

        element = compileElement(scope, compile);
    }));

    it('should make hidden element visible', function () {
        expect(element).not.toBeUndefined();
    });

    it('should contain 3 li elements', function () {
        var lis = element.find('li');

        expect(lis.length).toBe(3);
    });

    xit('should update steps item with done class when currentStep is set to 1 by DemoCtrl controller', function () {

        var elm;
        var lis;

        controller('DemoCtrl', {
            $scope: scope
        });
        elm = compileElement(scope, compile);
        lis = elm.find('li');
        scope.$digest();

        expect(lis[0].classList[0]).toBe('done');
        expect(lis[1].classList[0]).toBe('done');
        expect(lis[2].classList.length).toBe(0);
    });

    function compileElement(scope, compile) {
        element = angular.element('<div get-steps-bar></div>');
        element = compile(element)(scope);

        return element;
    };
});
