angular.module('angularApp')
    .directive('reverseGeocode', function () {
        return {
            restrict: 'E',
            template: '<input type="text" value="{{address}}" disabled class="form-control" placeholder="eg. 3rd Street, New York, US">',
            scope: {
                latitude: '@',
                longitude: '@'
            },
            link: function (scope, element, attrs) {
                var geocoder = new google.maps.Geocoder();
                var geocodeToAddress = function (){
                    var latlng = new google.maps.LatLng(attrs.latitude, attrs.longitude);
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

                                scope.address = city + ", " + country;
                            } else {
                                scope.address = 'Location not found';
                            }
                        } else {
                            scope.address = 'Geocoder failed due to: ' + status;
                        }
                    });
                };

                scope.$watchCollection('[latitude, longitude]', function(newValues, oldValues){
                    geocodeToAddress();
                });
            }
        }
    });