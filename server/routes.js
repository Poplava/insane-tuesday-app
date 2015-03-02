'use strict';

var UserModule = require('./module/user'),
    PlayerModule = require('./module/player');

module.exports = function(app) {
    console.log('Registering modules...');

    app.use('/auth', UserModule.router);
    app.use('/api/players', PlayerModule.router);

    console.log('Done!');
};