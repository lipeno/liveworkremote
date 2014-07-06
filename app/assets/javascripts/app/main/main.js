'use strict';

angular.module('angularApp')
  .controller('MainCtrl', function ($scope) {

        $scope.description = "Click on a pin";
        $scope.onMarkerClicked = function(markerId) {
            console.log(markerId + "clicked");
            $scope.description = "User: John Smith, Occupation: developer, id: " + markerId;
        };

        $scope.map = {
            center: {
                latitude: 40.74,
                longitude: -74.18
            },
            zoom: 8
        };

        var markers = new Array();

        var someData = [
            {
            latitude: 40.71,
            longitude: -74.21
            },
            {
                latitude: 40.73,
                longitude: -74.19
            }

        ]

        for(var i = 0; i < someData.length; i++ ){

            var newMarker = {
                id: parseInt(i),
                latitude: parseFloat(someData[i].latitude),
                longitude: parseFloat(someData[i].longitude),
                showWindow: false,
                title: "Marker"+i
            }

            newMarker.onClicked = function () {
                $scope.onMarkerClicked(newMarker.id);
            }

            markers.push(newMarker);
        }

        $scope.markers = markers;

  });
