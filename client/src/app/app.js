define(function(require) {
    'use strict';

    var angular = require('angular'),
        RoutingConfig = require('./config/routing'),
        AuthConfig = require('./config/auth'),

        SecurityModule = require('module/security'),

        AppController = require('./controller/app.controller'),
        app;

    require('angular-route');
    require('angular-resource');
    require('angular-satellizer');
    require('angular-bootstrap');

    app = angular.module('App', [
        'ngRoute',
        'ngResource',
        'satellizer',
        'ui.bootstrap',
        SecurityModule.name
    ]);

    app.config(RoutingConfig);
    app.config(AuthConfig);

    app.controller('AppCtrl', AppController);

    return app;
});