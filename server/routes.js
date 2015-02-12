'use strict';

var UserModule = require('./module/user');

module.exports = function(app) {
    console.log('Registering modules...');

    app.all('/', function(req, res) {
        res.render('index');
    });

    app.use('/auth', UserModule.routes);

    console.log('Done!');
};