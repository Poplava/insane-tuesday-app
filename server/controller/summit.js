'use strict';

var express = require('express'),
    router = express.Router(),
    async = require('async'),
    q = require('q'),
    moment = require('moment'),
    UserController = require('./user'),
    SummitModel = require('./summit.model');

router.get('/current', UserController.ensureUser, getCurrent);
router.post('/', UserController.ensureUser, createSummit);

module.exports.router = router;

function getCurrent(req, res) {
    SummitModel
        .getCurrent()
        .then(function(summit) {
            res.json(summit);
        })
}

function createSummit(req, res) {
    console.log(req);
    SummitModel.createSummit({
            name: req.body.name,
            comment: req.body.comment,
            date: req.body.date,
            creator: req.user._id
        })
        .then(function(summit) {
            res.json(summit);
        }, function(err) {
            res.status(500).json(err);
        });
}
