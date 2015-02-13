define(function(require) {

    UserFactory.$inject = ['$resource', '$auth', '$q', '$location'];

    return UserFactory;

    function UserFactory($resource, $auth, $q, $location) {
        var UserModel = $resource('/auth/:_id', { '_id': '@_id' }, {
            me: {
                params: {
                    '_id': 'me'
                }
            }
        });

        var factory = {
            isAuthenticated: $auth.isAuthenticated,
            user: new UserModel(),
            login: login,
            logout: logout,
            getCurrent: getCurrent
        };

        return factory;

        function login(provider) {
            return $auth
                .authenticate(provider)
                .then(getCurrent);
        }

        function logout() {
            return $auth
                .logout()
                .then(function() {
                    factory.user = new UserModel();
                });
        }

        function getCurrent() {
            if (factory.user._id) {
                return $q.when(factory.user);
            } else {
                return factory.user.$me();
            }
        }
    }
});