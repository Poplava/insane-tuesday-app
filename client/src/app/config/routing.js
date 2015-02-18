define(function() {
    'use strict';

    function RoutingConfig($locationProvider) {
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });
    }

    RoutingConfig.$inject = ['$locationProvider'];

    return RoutingConfig;
});