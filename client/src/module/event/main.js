define(function(require) {
    'use strict';

    var angular = require('angular'),

        EventFactory = require('./service/event.factory'),
        CurrentEventDirective = require('./directive/current-event.directive'),

        module = angular.module('EventModule', []);

    module.directive('dCurrentEvent', CurrentEventDirective);
    module.factory('EventFactory', EventFactory);

    return module;
});
