define(function(require) {
    'use strict';

    var template = require('text!./template/current-summit.html'),
        Controller = require('../controller/current-summit.controller');

    return function() {
        return {
            restrict: 'E',
            replace: true,
            template: template,
            controller: Controller
        };
    };
});