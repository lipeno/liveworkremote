angular.module('angularApp')
    .directive('reverseGeocode', function () {
        return {
            restrict: 'E',
            template: '<input type="text" value="{{address}}" disabled class="form-control" placeholder="eg. 3rd Street, New York, US">',
            scope: {
                lat: '@',
                lng: '@'
            },
            link: function (scope, element, attrs) {
                var geocoder = new google.maps.Geocoder();
                var geocodeToAddress = function (){
                    var latlng = new google.maps.LatLng(attrs.lat, attrs.lng);
                    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[1]) {
                                scope.address = results[1].formatted_address;
                            } else {
                                scope.address = 'Location not found';
                            }
                        } else {
                            scope.address = 'Geocoder failed due to: ' + status;
                        }
                    });
                };

                scope.$watchCollection('[lat, lng]', function(newValues, oldValues){
                    geocodeToAddress();
                });
            }
        }
    });