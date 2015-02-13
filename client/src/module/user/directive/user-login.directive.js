define(function(require) {
    'use strict';

    var template = require('text!./template/user-login.html'),
        Controller = require('../controller/user-login.controller');

    Directive.$inject = [];

    return Directive;

    function Directive() {
        return {
            restrict: 'E',
            replace: true,
            template: template,
            controller: Controller
            //controllerAs: 'dgUserMenuIns',
            //bindToController: true,
            //scope: false,
            //controller: Controller
        };
    }
});