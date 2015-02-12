define(function() {
    'use strict';

    function AuthConfig($authProvider) {
        $authProvider.google({
            clientId: '356331103346-vaksgemets04t92jnbjgnt8hal013pm4.apps.googleusercontent.com'
        });
    }

    AuthConfig.$inject = ['$authProvider'];

    return AuthConfig;
});