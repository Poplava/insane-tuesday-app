'use strict';

var UserController = require('./controller/user');

module.exports = function(app) {
    console.log('Registering modules...');

    app.all('/', function(req, res) {
        res.render('index');
    });

    app.use('/auth', UserController.router);

    console.log('Done!');
};