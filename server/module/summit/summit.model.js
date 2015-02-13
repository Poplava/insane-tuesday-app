'use strict';

var mongoose = require('mongoose'),
    q = require('q'),
    moment = require('moment'),

    Schema = mongoose.Schema,

    SummitModel;

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

//statics
SummitSchema.statics.getCurrent = getCurrent;
SummitSchema.statics.createSummit = createSummit;

//model
SummitModel = mongoose.model('Summit', SummitSchema);
module.exports = SummitModel;

//validators
SummitSchema.path('date').validate(validateCurrent, 'Summit already pending.');
SummitSchema.path('date').validate(validateDate, 'Date should be gte now');


function getCurrent() {
    return this
        .findOne({
            date: {
                '$gte': moment().toDate()
            }
        })
        .populate('creator', 'name picture')
        .exec();
}

function createSummit(attrs) {
    var def = q.defer();

    this.create(attrs, (function(err, summit) {
        if (err) def.reject(err);

        this
            .populate(summit, {
                path: 'creator',
                select: 'name picture'
            })
            .then(function(summit) {
                def.resolve(summit);
            });
    }).bind(this));

    return def.promise;
}

function validateCurrent(value, respond) {
    SummitModel
        .getCurrent()
        .then(function(current) {
            respond(!current);
        });
}

function validateDate(value) {
    return value > moment().toDate();
}