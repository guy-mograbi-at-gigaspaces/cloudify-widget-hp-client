'use strict';

describe('Controller: PreviewCtrl', function () {

  // load the controller's module
  beforeEach(module('cloudifyWidgetHpClientApp'));

  var PreviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PreviewCtrl = $controller('PreviewCtrl', {
      $scope: scope
    });
  }));
});
