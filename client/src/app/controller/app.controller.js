define(function(require) {
    'use strict';

    Controller.$inject = ['$scope', 'SecurityService'];

    return Controller;

    function Controller($scope, SecurityService) {
        $scope.foo = 'bar';
        $scope.user = SecurityService.currentUser;
        $scope.login= SecurityService.login;

        SecurityService.requestCurrentUser()
            .then(function(user) {
                $scope.user = user;
            });
    }
});