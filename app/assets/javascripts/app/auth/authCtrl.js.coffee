angular.module('angularApp').controller 'AuthCtrl', ['$scope', ($scope) ->
  # Created as an object so that its value can be manipulated through different scopes
  $scope.switcher = {
    value : "signin"
  }
]