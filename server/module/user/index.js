'use strict';

var express = require('express'),
    router = express.Router(),
    async = require('async'),
    q = require('q'),
    moment = require('moment'),
    jwt = require('jwt-simple'),
    config = require('../../config'),
    request = require('request'),
    UserModel = require('../../model/user');

router.post('/google', google);
router.get('/me', ensureUser, me);

module.exports.ensureUser = ensureUser;

module.exports.router = router;

function google(req, res) {
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.auth.google.secret,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };

    async.waterfall([
        requestToken,
        processToken
    ], responseProfile);

    function requestToken(callback) {
        request.post(config.auth.google.accessTokenUrl, { json: true, form: params }, callback);
    }

    function processToken(response, token, callback) {
        var headers = { Authorization: 'Bearer ' + token.access_token };

        request.get({ url: config.auth.google.peopleApiUrl, headers: headers, json: true }, callback);
    }

    function responseProfile(err, response, profile) {
        authenticate(err, req, res, profile, 'google', profile.sub);
    }
}

function authenticate(err, req, res, profile, provider, sub) {
    UserModel
        .findOne({ email: profile.email })
        .exec()
        .then(function(user) {
            if (user) {
                return user;
            }

            var defer = q.defer(),
                newUser = new UserModel({
                    name: profile.name,
                    email: profile.email,
                    picture: profile.picture
                });

            newUser[provider] = sub;

            newUser.save(function(err, user) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(user);
                }
            });

            return defer.promise;
        })
        .then(function (user) {
            res.status(200).json({token: createToken(user)});
        }, function(err) {
            res.status(500).json({error: err});
        });
}

function createToken(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(config.auth.TOKEN_EXPIRED_DAYS, 'days').unix()
    };
    return jwt.encode(payload, config.auth.TOKEN_SECRET);
}

function ensureUser(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: 'Please make sure your request has an Authorization header'
        });
    }

    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, config.auth.TOKEN_SECRET);

    if (payload.exp <= moment().unix()) {
        return res.status(401).json({
            message: 'Token has expired'
        });
    }

    UserModel
        .findById(payload.sub)
        .exec()
        .then(function(user) {
            req.user = user;
            next();
        }, function(err) {
            return res.status(500).json({
                error: 'Wrong email and/or password'
            });
        });
}

function me(req, res) {
    UserModel
        .findById(req.user._id)
        .select('-__v -google')
        .exec()
        .then(function(user) {
            res.send(user);
        });
}
