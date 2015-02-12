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
            authenticate: authenticate,
            logout: logout,
            getCurrent: getCurrent,
            ensureAuthenticated: ensureAuthenticated
        };

        return factory;

        function authenticate(provider) {
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

        function ensureAuthenticated() {
            var defer = $q.defer();

            if (factory.isAuthenticated()) {
                defer.resolve();
            } else {
                //TODO: move redirect form factory
                $location.url('/login');
                defer.reject();
            }
            return defer;
        }
    }
});