'use strict';

angular.module('angularApp')
    .controller('JobsCtrl', function ($scope, $q, GetMyCoordinates, $http, $rootScope, $location) {
        $scope.jobsCollection = [];

        $http.get('/api/jobs.json').
            success(function(data, status, headers, config) {
                $scope.jobsCollection = data;
            }).
            error(function(data, status, headers, config) {
            });

//        $scope.predicates = ['company', 'title'];
//        $scope.selectedPredicate = $scope.predicates[0];

        $scope.subscribe = function(email){
            $http.post('/api/newsletter/subscribe', {email:email}).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.responseMessage = data.message;
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $scope.responseMessage = data;
                });
        };

    });
