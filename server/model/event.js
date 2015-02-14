'use strict';

var mongoose = require('mongoose'),
    q = require('q'),
    moment = require('moment'),

    Schema = mongoose.Schema,

    EventModel;

var EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    topics: [{
        type: Schema.Types.ObjectId,
        ref: 'Topic'
    }]
});

EventSchema.statics.createEvent = createEvent;
EventSchema.statics.getCurrent = getCurrent;

//model
EventModel = mongoose.model('Event', EventSchema);
module.exports = EventModel;

//validators
EventSchema.path('date').validate(validateCurrent, 'Event is already pending.');
EventSchema.path('date').validate(validateDate, 'Date should be gte now.');


function createEvent(creator, name, date) {
    var def = q.defer(),
        attributes = {
            creator: creator._id,
            name: name,
            date: date
        };

    EventModel.create(attributes, function(err, model) {
        if (err) def.reject(err);

        EventModel
            .populate(model, {
                path: 'creator',
                select: 'name picture'
            })
            .then(function(model) {
                def.resolve(model);
            });
    });

    return def.promise;
}

function getCurrent() {
    return EventModel
        .findOne({
            date: {
                '$gte': moment().toDate()
            }
        })
        .populate('creator', 'name picture')
        .exec();
}

function validateCurrent(value, respond) {
    EventModel
        .getCurrent()
        .then(function(current) {
            respond(!current);
        });
}

function validateDate(value) {
    return value > moment().toDate();
}