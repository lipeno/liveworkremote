'use strict';

angular.module('angularApp')
    .controller('MainCtrl', function ($scope, $q, GetMyCoordinates, $http, $rootScope) {

        $scope.makeTextBlurry = true;
        if ($rootScope.current_user){
            $scope.makeTextBlurry = false;
        }

        $scope.onMarkerClicked = function (user, marker) {
            // marker.showWindow = true;
            $scope.$apply(function () {
                $scope.hobbies = user.hobbies;
                $scope.full_name = user.full_name;
                $scope.email = user.email;
                $scope.latitude = user.latitude;
                $scope.longitude = user.longitude;
                $scope.work = user.work;
                $scope.plans = user.plans;
            });
        };

        $scope.map = {
            center: {
                latitude: 40.74,
                longitude: -74.18
            },
            zoom: 3,
            options: {
                mapTypeControl: false, // Disable changing of map type
                minZoom: 3, // Maximum zoom out
                scrollwheel: false // Disable zooming with scroll
            }
        };


        $scope.allUsers = [];

        $http({method: 'GET', url: '/api/users'}).
            success(function (data, status, headers, config) {
                $scope.allUsers = data;

                $scope.markers = [];

                for (var i = 0; i < $scope.allUsers.length; i++) {
                    // Using Immediately-Invoked Function Expression/closure to avoid problem with having the variable i
                    // within each of anonymous functions being bound to the same variable outside of the function.
                    (function (i) {
                        var newMarker = {
                            id: parseInt(i),
                            latitude: parseFloat($scope.allUsers[i].latitude),
                            longitude: parseFloat($scope.allUsers[i].longitude),
                            showWindow: false,
                            labelContent: $scope.allUsers[i].full_name
                        };

                        var user = $scope.allUsers[i];

                        newMarker.onClicked = function () {
                            $scope.onMarkerClicked(user, newMarker);
                        };

                        $scope.markers.push(newMarker);

                    })(i);


                }
            }).
            error(function (data, status, headers, config) {
                console.log(data);
            });


        $scope.setCoordinates = function () {
            GetMyCoordinates().then(function success(data) {
                var pos = data;
                $scope.map = {
                    center: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    },
                    zoom: 8
                };
                console.log(data);
            }, function error(msg) {
                console.error(msg);
            });
        };

        $scope.$watch("searchedLocation", function(location){
            if (location) {
                $scope.map = {
                    center: {
                        latitude: location.geometry.location.k,
                        longitude: location.geometry.location.B
                    },
                    zoom: 11
                };
            }
        })

    });
