define(function(require) {
    'use strict';

    Service.$inject = ['$auth', '$resource', '$q'];

    return Service;

    function Service($auth, $resource, $q) {
        var UserModel = $resource('/auth/:_id', {_id: '@_id'}, {
            getCurrent: {
                params: {
                    _id: 'me'
                }
            }
        });

        var service = {
            isLoggedIn: $auth.isAuthenticated,
            currentUser: null,
            requestCurrentUser: requestCurrentUser,
            login: login
        };

        return service;

        function login(provider) {
            return $auth.authenticate(provider).then(requestCurrentUser);
        }

        function requestCurrentUser() {
            if (service.currentUser) {
                return $q.when(service.currentUser);
            } else {
                service.currentUser = new UserModel();
                return service.currentUser.$getCurrent();
            }
        }
    }
});