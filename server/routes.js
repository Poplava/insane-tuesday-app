'use strict';

var UserController = require('./controller/user'),
    EventController = require('./controller/event');

module.exports = function(app) {
    console.log('Registering modules...');

    app.all('/', function(req, res) {
        res.render('index');
    });

    app.use('/auth', UserController.router);
    app.use('/api/event', EventController.router);

    console.log('Done!');
};