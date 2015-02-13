'use strict';

var async = require('async'),
    q = require('q'),
    moment = require('moment'),
    SummitModel = require('./summit.model');

module.exports.getCurrent = getCurrent;
module.exports.createSummit = createSummit;

function getCurrent(req, res) {
    SummitModel
        .getCurrent()
        .then(function(summit) {
            res.json(summit);
        })
}

function createSummit(req, res) {
    SummitModel.createSummit({
            name: req.body.name,
            comment: req.body.comment,
            date: moment(req.body.date, 'DD-MM-YYYY HH:mm'),
            creator: req.user._id
        })
        .then(function(summit) {
            res.json(summit);
        }, function(err) {
            res.status(500).json(err);
        });
}
