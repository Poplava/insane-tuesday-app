'use strict';

var async = require('async'),
    q = require('q'),
    moment = require('moment'),
    SummitModel = require('./summit.model');

module.exports.getCurrent = getCurrent;
module.exports.createSummit = createSummit;

function getCurrent(req, res) {

}

function createSummit(req, res) {
    SummitModel.create({
        name: '',
        comment: '123',
        date: moment(),
        creator: req.user._id
    }, function(err, summit) {
        if (err) {
            res.status(400).json(err);
        }
        SummitModel
            .populate(summit, {
                path: 'creator',
                select: 'name picture'
            })
            .then(function(summit) {
                res.json(summit);
            });
    });
}
