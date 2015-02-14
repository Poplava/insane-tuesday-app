define(function(require) {

    Factory.$inject = ['$resource', '$q'];

    return Factory;

    function Factory($resource, $auth, $q, $location) {
        var EventModel = $resource('/api/event/:_id', { '_id': '@_id' }, {
            current: {
                params: {
                    '_id': 'current'
                }
            }
        });

        var factory = {
            currentEvent: new EventModel(),
            getCurrent: getCurrent
        };

        return factory;

        function getCurrent() {
            if (factory.currentEvent._id) {
                return $q.when(factory.currentEvent);
            } else {
                return factory.currentEvent.$current();
            }
        }
    }
});