'use strict';

describe('Controller: LearnCtrl', function () {

  // load the controller's module
  beforeEach(module('cloudifyWidgetHpClientApp'));

  var LearnCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LearnCtrl = $controller('LearnCtrl', {
      $scope: scope
    });
  }));
});
