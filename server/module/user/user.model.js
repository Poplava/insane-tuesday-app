'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        lowercase: true,
        unique: true
    },
    picture: String,
    role: {
        type: String,
        default: 'guest'
    },
    google: String
});

module.exports = mongoose.model('Users', UserSchema);
