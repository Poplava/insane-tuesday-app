'use strict';

var UserController = require('./controller/user'),
    EventController = require('./controller/event');

module.exports = function(app) {
    console.log('Registering modules...');

    app.use('/auth', UserController.router);
    app.use('/api/event', EventController.router);

    console.log('Done!');
};