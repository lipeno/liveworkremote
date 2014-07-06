angular.module('angularApp')
    .factory('GetMyCoordinates', function ($rootScope, $window, $q) {
        return function (){
            var deferred = $q.defer();

            if(!$window.navigator) {
                deferred.reject("Geolocation is not supported");
            } else {
                $window.navigator.geolocation.getCurrentPosition(function(pos) {
                    deferred.resolve(pos);
                    $rootScope.$apply(function(){
                        deferred.resolve(pos);
                    });
                }, function(error) {
                    deferred.reject('Unable to get location: ' + error.message);
                });
            }

            return deferred.promise;
        };
    });