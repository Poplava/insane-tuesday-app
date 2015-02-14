'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    picture: String,
    role: {
        type: String,
        default: 'guest'
    },
    google: String
});

module.exports = mongoose.model('User', UserSchema);
