define(function(require) {
    'use strict';

    var angular = require('angular'),

        SecurityService = require('./service/security.service'),

        module = angular.module('Security', []);

    module.factory('SecurityService', SecurityService);

    return module;
});