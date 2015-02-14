define(function(require) {
    'use strict';

    var angular = require('angular'),
        moment = require('moment'),
        UserFactory = require('./service/user.factory'),
        UserLoginDirective = require('./directive/user-login.directive'),

        module = angular.module('UserModule', []);

    module.factory('UserFactory', UserFactory);
    module.directive('dUserLogin', UserLoginDirective);

    Controller.$inject = ['$scope', '$http', 'UserFactory'];

    module.controller('UserController', Controller);

    return module;

    function Controller($scope, $http, UserFactory) {
        $scope.current = null;
        $scope.name = '';
        $scope.comment = '';
        $scope.date = moment().day(9).format('DD-MM-YYYY HH:mm');
        $scope.submit = function() {
            console.log(moment($scope.date, 'DD-MM-YYYY HH:mm').toDate());
            $http.post('/api/summit', {
                name: $scope.name,
                comment: $scope.comment,
                date: moment($scope.date, 'DD-MM-YYYY HH:mm').toDate()
            }).then(function() {
                console.log('success', arguments);
            }, function(res) {
                console.log('error', res.data);
            });
        };
    }
});
