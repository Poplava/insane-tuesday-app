'use strict';

module.exports = {
    port: 3000,
    ip: 'localhost',
    mongo: {
        uri: 'mongodb://localhost/insane-tuesday'
    },
    auth: {
        google: {
            secret: '2OaIho-8aM4mE1E74YeIzoIZ',
            accessTokenUrl: 'https://accounts.google.com/o/oauth2/token',
            peopleApiUrl: 'https://www.googleapis.com/plus/v1/people/me/openIdConnect'
        },
        TOKEN_EXPIRED_DAYS: 7,
        TOKEN_SECRET: '123'
    }
};