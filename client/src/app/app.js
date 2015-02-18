define(function(require) {
    'use strict';

    var angular = require('angular'),
        RoutingConfig = require('./config/routing'),
        AuthConfig = require('./config/auth'),
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
        'ui.bootstrap'
    ]);

    app.controller('AppCtrl', AppController);

    return app;
});