'use strict';

describe('Controller: DemoCtrl', function () {

    // load the controller's module
    beforeEach(module('cloudifyWidgetHpClientApp'));

    var DemoCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        DemoCtrl = $controller('DemoCtrl', {
            $scope: scope
        });
    }));

    it ('should have a controller', function() {
        expect(DemoCtrl).not.toBeUndefined();
    });

    it('should update currentStep variable with 1', function () {
        expect(scope.currentStep).toBe(1);
    });
});
