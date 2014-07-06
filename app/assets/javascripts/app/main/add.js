'use strict';

angular.module('angularApp')
    .controller('AddCtrl', function ($scope) {

        $scope.foo = function(event, arg1, arg2) {
            alert('this is at '+ this.getPosition());
            alert(arg1+arg2);
            $scope.description = "User: John Smith, Occupation: developer";
        }

        $scope.description = "Click on a pin";
    });
