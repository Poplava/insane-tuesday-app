define(function(require) {
    'use strict';

    var angular = require('angular');

    Controller.$inject = ['$scope', '$location', 'UserFactory'];

    return Controller;

    function Controller($scope, $location, UserFactory) {
        $scope.login = function(provider) {
            UserFactory
                .login(provider)
                .then(function() {
                    $location.url('/');
                });
        };
    }
});