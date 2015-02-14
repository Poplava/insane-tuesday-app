define(function(require) {
    'use strict';

    var angular = require('angular'),
        moment = require('moment');

    Controller.$inject = ['$scope', '$interval', 'EventFactory'];

    return Controller;

    function Controller($scope, $interval, EventFactory) {
        var date;

        $scope.currentEvent = EventFactory.currentEvent;
        $scope.secondsLeft = null;

        EventFactory
            .getCurrent()
            .then(init);

        function init() {
            date = moment($scope.currentEvent.date);
            countTimer();
            $interval(countTimer, 1000 * 60);
        }

        function countTimer() {
            $scope.secondsLeft = date.from(moment());
        }
    }
});
