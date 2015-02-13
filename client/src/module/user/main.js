define(function(require) {
    'use strict';

    var angular = require('angular'),
        UserFactory = require('./service/user.factory'),
        UserLoginDirective = require('./directive/user-login.directive'),

        module = angular.module('UserModule', []);

    module.factory('UserFactory', UserFactory);
    module.directive('dUserLogin', UserLoginDirective);

    Controller.$inject = ['$scope', '$http', 'UserFactory'];

    module.controller('UserController', Controller);

    return module;

    function Controller($scope, $http, UserFactory) {
        $http.get('/api/summit/current');
        $http.post('/api/summit');
    }
});
