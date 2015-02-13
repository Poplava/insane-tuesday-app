define(function(require) {
    'use strict';

    var angular = require('angular'),
        RootScreen = require('screen'),

        RoutingConfig = require('config/routing'),
        AuthConfig = require('config/auth');

    require('angular-route');
    require('angular-resource');
    require('angular-satellizer');
    require('angular-bootstrap');

    var app = angular.module('MoneysApp', [
        RootScreen.name
    ])
        .config(AuthConfig)
        .config(RoutingConfig);

    angular.bootstrap(document, [
        'ngRoute',
        'ngResource',
        'satellizer',
        'ui.bootstrap',
        app.name
    ]);
});