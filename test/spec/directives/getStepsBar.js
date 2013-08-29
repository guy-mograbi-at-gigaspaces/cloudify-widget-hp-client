'use strict';

describe('Directive: getStepsBar', function () {
    beforeEach(module('cloudifyWidgetHpClientApp'));

    var DemoCtrl,
        scope,
        compile,
        element;

    beforeEach(inject(function ($controller, $rootScope, $compile) {
        scope = $rootScope.$new();
        compile = $compile;
        DemoCtrl = $controller('DemoCtrl', {
            $scope: scope
        });
        scope.currentStep = 1;
        element = compileElement(scope, compile);
    }));

    it('should make hidden element visible', function () {
        expect(element).not.toBeUndefined();
    });

    xit('should update step1 item with done class when currentStep is set to 1', function () {
        //element = compileElement(scope, compile);
        var step1 = element.find('li')[0];

        expect(step1.classList).toBe(5);
    });

    function compileElement(scope, compile) {
        element = angular.element('<div get-steps-bar></div>');
        element = compile(element)(scope);

        return element;
    };
});
