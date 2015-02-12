define(function() {
    'use strict';

    function AuthConfig($authProvider) {
        $authProvider.google({
            clientId: '660557492489-10v8dq4p7d6rb4k0j5vc657hocifkf81.apps.googleusercontent.com'
        });
    }

    AuthConfig.$inject = ['$authProvider'];

    return AuthConfig;
});