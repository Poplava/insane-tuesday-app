define(function(require) {
    'use strict';

    var template = require('text!./template/current-event.html'),
        Controller = require('../controller/current-event.controller');

    return function() {
        return {
            restrict: 'E',
            replace: true,
            template: template,
            controller: Controller
        };
    };
});