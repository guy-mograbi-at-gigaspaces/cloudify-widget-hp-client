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

    xit('should contain 3 li elements', function () {
        var lis = element.find('li');

        expect(lis.length).toBe(3);
    });

    xit('should update steps item with done class when currentStep is set to 3 by SignupCtrl controller', function () {

        var elm;
        var lis;

        controller('SignupCtrl', {
            $scope: scope
        });
        elm = compileElement(scope, compile);
        lis = elm.find('li');
        scope.$digest();

        expect(lis[0].children[0].classList[1]).toBe('done');
        expect(lis[1].children[0].classList[1]).toBe('done');
        expect(lis[2].children[0].classList[1]).toBe('activeStep');
    });

    function compileElement(scope, compile) {
        element = angular.element('<div get-steps-bar></div>');
        element = compile(element)(scope);

        return element;
    };
});
