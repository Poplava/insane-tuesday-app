'use strict';

var express = require('express'),
    router = express.Router(),
    PlayerModel = require('../../model/player'),
    UserModule = require('../user');

router.get('', UserModule.ensureUser, getPlayers);
router.post('', UserModule.ensureUser, createPlayer);
router.get('/:id', UserModule.ensureUser, getPlayer);
router.patch('/:id', UserModule.ensureUser, updatePlayer);

module.exports.router = router;

function getPlayers(req, res) {
    PlayerModel
        .find({
            user: req.user._id
        })
        .select('-__v')
        .populate('user', 'name')
        .exec()
        .then(function(players) {
            res.json(players);
        });
}

function createPlayer(req, res) {
    var newPlayer = new PlayerModel({
        name: req.body.name,
        user: req.user
    });

    newPlayer.save(function(err, player) {
        if (err) {
            res.status(500).json({
                message: 'Server error'
            });
        }

        res.json(player);
    });
}

function getPlayer(req, res) {
    var id = req.params.id;

    PlayerModel
        .findById(req.params.id)
        .select('-__v')
        .exec()
        .then(function(player) {
            res.send(player);
        });
}

function updatePlayer(req, res) {
    PlayerModel
        .findByIdAndUpdate(req.params.id);
}