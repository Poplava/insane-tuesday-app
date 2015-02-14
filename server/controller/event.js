'use strict';

var express = require('express'),
    router = express.Router(),
    UserController = require('./user'),
    EventModel = require('../model/event');

router.get('/current', UserController.ensureUser, getCurrent);
router.post('/', UserController.ensureUser, createEvent);

module.exports.router = router;

function getCurrent(req, res) {
    EventModel
        .getCurrent()
        .then(function(model) {
            res.json(model);
        });
}
function createEvent(req, res) {
    EventModel.createEvent(req.user, req.body.name, req.body.date)
        .then(function(model) {
            res.json(model);
        }, function(err) {
            res.status(500).json(err);
        });
}
