'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SummitSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Summit', SummitSchema);
