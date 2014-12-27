'use strict';

angular.module('angularApp')
    .controller('AddCtrl', function ($scope, GetMyCoordinates, Restangular, Session) {
        Session.requestCurrentUser().then(function(userData) {
            var userId = userData.data.id;
            Restangular.one('users', userId).get().then(function(user) {
                $scope.user = user;
                $scope.addMarker($scope.user.latitude, $scope.user.longitude);
            });
        });


        $scope.markers = [];
        $scope.map = {
            center: {
                latitude: 40.74,
                longitude: -74.18
            },
            zoom: 8
        };

        $scope.saveData = function() {
            if ($scope.user){
                $scope.user.save();
            }
        };

        $scope.setCoordinates = function() {
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

        $scope.saveCoordinates = function() {
            $scope.setCoordinates();
            GetMyCoordinates().then(function success(data) {
                var pos = data;
                var offset = ((Math.random() > 0.5 ? 0.001 : -0.009) + Math.random() * 0.008);
                var lat = parseFloat(pos.coords.latitude) + offset;
                var long = parseFloat(pos.coords.longitude);

                if ($scope.user) {
                    // Add offset for anonymization o user's location
                    $scope.user.latitude = lat;
                    $scope.user.longitude = long;
                }
                $scope.addMarker(lat, long);

                console.log(data);
            }, function error(msg) {
                console.error(msg);
            });
        };

        $scope.addMarker = function(lat, long) {
            var newMarker = {
                id: 1,
                latitude: lat,
                longitude: long,
                showWindow: true,
                title: "My location"
            };
            $scope.markers[0] = newMarker;
        };

        $scope.setCoordinates();



    });
