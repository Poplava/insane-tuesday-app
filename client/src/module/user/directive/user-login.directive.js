define(function(require) {
    'use strict';

    var template = require('text!./template/user-login.html'),
        Controller = require('../controller/user-login.controller');

    return function() {
        return {
            restrict: 'E',
            replace: true,
            template: template,
            controller: Controller
        };
    };
});