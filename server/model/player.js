'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    UserModel = require('./user');

var playerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    experience: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0
    },
    strength: {
        type: Number,
        default: 3
    },
    agility: {
        type: Number,
        default: 3
    },
    stamina: {
        type: Number,
        default: 3
    }
}, {
    toJSON: {
        virtuals: true
    },
    id: false
});

playerSchema.virtual('params.critical').get(getParamCritical);
playerSchema.virtual('params.avoidance').get(getParamAvoidance);

module.exports = mongoose.model('Player', playerSchema);

function getParamCritical() {
    return (this.level + 1) * 5 + this.agility / 10;
}

function getParamAvoidance() {
    return (this.level + 1) * 6 + this.agility / 7;
}
