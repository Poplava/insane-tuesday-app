'use strict';

var express = require('express'),
    router = express.Router(),
    UserController = require('./user.controller');

router.post('/google', UserController.google);
router.get('/me', UserController.ensureAuthenticated, UserController.decodeUserId, UserController.me);

module.exports.routes = router;
module.exports.api = {
    decodeUserId: UserController.decodeUserId
};

