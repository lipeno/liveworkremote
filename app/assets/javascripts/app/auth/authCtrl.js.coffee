angular.module('angularApp').controller 'AuthCtrl', ($scope, $stateParams) ->
  # Created as an object so that its value can be manipulated through different scopes
  if ($stateParams.type == "signup")
    $scope.switcher =
      value : "signup"
  else if ($stateParams.type == "signin")
    $scope.switcher =
      value : "signin"
  else
    $scope.switcher =
      value : "signin"