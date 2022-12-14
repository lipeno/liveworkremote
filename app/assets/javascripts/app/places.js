'use strict';

angular.module('angularApp')
    .controller('PlacesCtrl', function ($scope, $q, GetMyCoordinates, $http, $rootScope) {

        $scope.makeTextBlurry = true;
        if ($rootScope.current_user){
            $scope.makeTextBlurry = false;
        }

        var geocoder = new google.maps.Geocoder();
        $scope.geocodeToAddress = function (latitude, longitude){
            var deferred = $q.defer();
            var latlng = new google.maps.LatLng(latitude, longitude);
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var address = "", city = "", state = "", zip = "", country = "", formattedAddress = "";

                        for (var i = 0; i < results[0].address_components.length; i++) {
                            var addr = results[0].address_components[i];
                            // check if this entry in address_components has a type of country
                            if (addr.types[0] == 'country')
                                country = addr.long_name;
                            else if (addr.types[0] == 'street_address') // address 1
                                address = address + addr.long_name;
                            else if (addr.types[0] == 'establishment')
                                address = address + addr.long_name;
                            else if (addr.types[0] == 'route')  // address 2
                                address = address + addr.long_name;
                            else if (addr.types[0] == 'postal_code')       // Zip
                                zip = addr.short_name;
                            else if (addr.types[0] == ['administrative_area_level_1'])       // State
                                state = addr.long_name;
                            else if (addr.types[0] == ['locality'])       // City
                                city = addr.long_name;
                        }

                        if (results[0].formatted_address != null) {
                            formattedAddress = results[0].formatted_address;
                        }

                        deferred.resolve((city + ", " + country));
                    } else {
                        deferred.reject('Location not found');
                    }
                } else {
                    deferred.reject('Geocoder failed due to: ' + status);
                }
            });
            return deferred.promise;
        };

        $scope.onMarkerClicked = function (place, marker) {
//            $scope.geocodeToAddress(place.latitude, place.longitude).then(
//                function(data) {
//                    $scope.address = data;
//                },
//                function(data) {
//                    $scope.address = data;
//                }
//            );
            $scope.place = place;
            $scope.$apply(); //this triggers a $digest
        };

        $scope.map = {
            center: {
                latitude: 41.5343080613728,
                longitude: -21.797187499999996
            },
            zoom: 3,
            options: {
                mapTypeControl: false, // Disable changing of map type
                minZoom: 3, // Maximum zoom out
                scrollwheel: false // Disable zooming with scroll
            },
            refresh: {}
        };


        var url = "/api/places.json";
        $http({method: 'GET', url: url}).
            success(function (data, status, headers, config) {
                $scope.allCoworkingSpaces = data;
                $scope.markers = [];

                for (var i = 0; i < $scope.allCoworkingSpaces.length; i++) {
                    // Using Immediately-Invoked Function Expression/closure to avoid problem with having the variable i
                    // within each of anonymous functions being bound to the same variable outside of the function.
                    (function (i) {
                        var newMarker = {
                            id: parseInt(i),
                            latitude: parseFloat($scope.allCoworkingSpaces[i].lat),
                            longitude: parseFloat($scope.allCoworkingSpaces[i].lng),
                            showWindow: false,
                            labelContent: $scope.allCoworkingSpaces[i].name
                        };

                        var place = $scope.allCoworkingSpaces[i];

                        newMarker.onClicked = function () {
                            $scope.onMarkerClicked(place, newMarker);
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

        // Triggered after doing a search for a city inside a google map
        $scope.$watch("searchedLocation", function(location){
            if (location) {
                $scope.map = {
                    center: {
                        latitude: location.geometry.location.k,
                        longitude: location.geometry.location.D
                    },
                    zoom: 11
                };
            }
        })

    });