'use strict';

var express = require('express'),
    router = express.Router(),
    UserController = require('../user/user.controller'),
    SummitController = require('./summit.controller');

router.get('/current', UserController.ensureAuthenticated, SummitController.getCurrent);
router.post('/', UserController.ensureAuthenticated, UserController.decodeUserId, SummitController.createSummit);

module.exports.routes = router;
