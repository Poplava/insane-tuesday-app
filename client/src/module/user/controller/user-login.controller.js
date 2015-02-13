define(function(require) {
    'use strict';

    var angular = require('angular');

    Controller.$inject = ['$scope', '$modal', 'UserFactory'];

    return Controller;

    function Controller($scope, $modal, UserFactory) {
        $scope.login = function() {
            console.log(123);
        };

        $scope.open = function (size) {

            var modalInstance = $modal.open({
                template: '<h1>Hello world!</h1>'
            });
        };
    }
});