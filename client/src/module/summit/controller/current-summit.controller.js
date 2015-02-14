define(function(require) {
    'use strict';

    var angular = require('angular');

    Controller.$inject = ['$scope', '$http'];

    return Controller;

    function Controller($scope, $http) {
        $scope.current = null;

        $http.get('/api/summit/current').then(function(current) {
            console.log(current.data);
            $scope.current = current.data;
        });
    }
});