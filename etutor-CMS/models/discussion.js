// Defines the discussions model

const mongoose = require('mongoose');
const CommentSchema = require('../models/Comment');

// subject schema
const DiscussionSchema = module.exports =  mongoose.Schema({
    _id                     :   {type: mongoose.Schema.Types.ObjectId},
    topic_id                     :String,
    comments                    :   [CommentSchema]
});

const model =  mongoose.model('Discussion', DiscussionSchema);
module.exports.getModel = model;

// get all comments
module.exports.getAllDiscussions = function(callback) {
    model.find({}, callback);
};

// get all comments
module.exports.findMatch = function(topic_id, callback) {
    const query = {'topic_id':topic_id};
    model.findOne(query, callback);
};

module.exports.findMatchWithAuth = function(topic_id, user_email, callback){
    const query = {'topic_id':topic_id, 'user_email':user_email};
    model.findOne(query, callback);
};

// creates a new comment
module.exports.addDiscussion = function(newDiscussion, callback) {
    newDiscussion.save(callback); // saves to the db
};

//removes a subscription
module.exports.remove = function(_id, callback) {

    model.remove({ '_id': _id }, callback)
};