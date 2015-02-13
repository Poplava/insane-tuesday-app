define(function(require) {
    'use strict';

    var angular = require('angular'),
        UserModule = require('module/user'),
        SummitModule = require('module/summit'),

        appTemplate = require('text!./template/app.html'),
        loginTemplate = require('text!./template/login.html'),

        module = angular.module('RootScreen', [
            UserModule.name,
            SummitModule.name
        ]);

    Screen.$inject = ['$routeProvider'];

    function Screen($routeProvider) {
        $routeProvider
            .when('/', {
                template: appTemplate,
                resolve: {
                    ensureAuthenticated: EnsureAuthenticated
                }
            })
            .when('/login', {
                template: loginTemplate,
                resolve: {
                    ensureUnauthenticated: EnsureUnauthenticated
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    EnsureAuthenticated.$inject = ['$q', '$location', 'UserFactory'];

    function EnsureAuthenticated($q, $location, UserFactory) {
        var defer = $q.defer();

        if (UserFactory.isAuthenticated()) {
            defer.resolve();
        } else {
            $location.url('/login');
            defer.reject();
        }

        return defer;
    }

    EnsureUnauthenticated.$inject = ['$q', '$location', 'UserFactory'];

    function EnsureUnauthenticated($q, $location, UserFactory) {
        var defer = $q.defer();

        if (!UserFactory.isAuthenticated()) {
            defer.resolve();
        } else {
            $location.url('/');
            defer.reject();
        }

        return defer;
    }

    module.config(Screen);
    return module;

});
