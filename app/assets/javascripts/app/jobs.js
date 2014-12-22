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

        $scope.predicates = ['company', 'title'];
        $scope.selectedPredicate = $scope.predicates[0];

    });
