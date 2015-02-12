define(function(require) {
    'use strict';

    var angular = require('angular'),
        UserModule = require('module/user'),

        appTemplate = require('text!./template/app.html'),
        loginTemplate = require('text!./template/login.html'),

        module = angular.module('RootScreen', [
            UserModule.name
        ]);

    Screen.$inject = ['$routeProvider'];
    EnsureAuthenticatedResolver.$inject = ['UserFactory'];

    module.config(Screen);

    return module;

    function Screen($routeProvider) {
        $routeProvider
            .when('/', {
                template: appTemplate,
                resolve: {
                    ensureAuthenticated: EnsureAuthenticatedResolver
                }
            })
            .when('/login', {
                template: loginTemplate
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    function EnsureAuthenticatedResolver(UserFactory) {
        return UserFactory.ensureAuthenticated();
    }
});
