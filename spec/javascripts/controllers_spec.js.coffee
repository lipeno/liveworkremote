# spec/javascripts/controllers_spec.js.coffee

describe "Restauranteur controllers", ->
  beforeEach module("PalytteApp")

  describe "RestaurantIndexCtrl", ->
    it "should set restaurants to an empty array", inject(($controller) ->
      scope = {}
      ctrl = $controller("RestaurantIndexCtrl",
        $scope: scope
      )
      expect(scope.restaurants.length).toBe 0
    )