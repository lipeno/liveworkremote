'use strict';

angular.module('angularApp')
    .controller('AddCtrl', function ($scope, GetMyCoordinates, Restangular, Session) {
        Session.requestCurrentUser().then(function(userData) {
            var userId = userData.data.id;
            Restangular.one('users', userId).get().then(function(user) {
                $scope.user = user;
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

                if ($scope.user){
                        $scope.user.latitude = parseFloat(pos.coords.latitude);
                        $scope.user.longitude = parseFloat(pos.coords.longitude);
                }
                //                var newMarker = {
//                    id: 1,
//                    latitude: parseFloat(pos.coords.latitude),
//                    longitude: parseFloat(pos.coords.longitude),
//                    showWindow: true,
//                    title: "My location"
//                };
//                $scope.markers.push(newMarker);

                // Save to db

                console.log(data);
            }, function error(msg) {
                console.error(msg);
            });
        };

        $scope.setCoordinates();



    });
