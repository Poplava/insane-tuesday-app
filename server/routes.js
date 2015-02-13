'use strict';

var UserModule = require('./module/user'),
    SummitModule = require('./module/summit');

module.exports = function(app) {
    console.log('Registering modules...');

    app.all('/', function(req, res) {
        res.render('index');
    });

    app.use('/auth', UserModule.routes);
    app.use('/api/summit', SummitModule.routes);

    console.log('Done!');
};