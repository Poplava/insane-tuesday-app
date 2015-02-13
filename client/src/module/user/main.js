define(function(require) {
    'use strict';

    var angular = require('angular'),
        UserFactory = require('./service/user.factory'),
        UserLoginDirective = require('./directive/user-login.directive'),

        module = angular.module('UserModule', []);

    module.factory('UserFactory', UserFactory);
    module.directive('dUserLogin', UserLoginDirective);

    Controller.$inject = ['$scope', 'UserFactory'];

    module.controller('UserController', Controller);

    return module;

    function Controller($scope, UserFactory) {
        $scope.user = UserFactory.user;
        $scope.isAuthenticated = UserFactory.isAuthenticated;
        $scope.authenticate = UserFactory.authenticate;
        $scope.logout = UserFactory.logout;

        $scope.$watch(function() {
            return UserFactory.user;
        }, function(user) {
            $scope.user = user;
        });
    }
});
