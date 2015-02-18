define(function(require) {
    'use strict';

    var angular = require('angular'),
        app = require('app/app');

    angular.bootstrap(document, [
        app.name
    ]);
});