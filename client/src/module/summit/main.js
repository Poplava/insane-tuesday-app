define(function(require) {
    'use strict';

    var angular = require('angular'),

        CurrentSummitDirective = require('./directive/current-summit.directive'),

        module = angular.module('SummitModule', []);

    module.directive('dCurrentSummit', CurrentSummitDirective);

    return module;
});
