// Defines the discussions model

const mongoose = require('mongoose');
const CommentSchema = require('../models/comment');

// subject schema
const DiscussionSchema =  mongoose.Schema({
    _id                     :   {type: mongoose.Schema.Types.ObjectId},
    topic_id                     :String,
    comments                    :   [CommentSchema]
});

const Discussion = module.exports = mongoose.model('Discussion', DiscussionSchema);
module.exports.getSchema = DiscussionSchema;

// get all comments2
module.exports.getAllDiscussions = function(callback) {
    Discussion.find({}, callback);
};

// get all comments
module.exports.findMatch = function(topic_id, callback) {
    const query = {'topic_id':topic_id};
    Discussion.findOne(query, callback);
};

// module.exports.findMatchWithAuth = function(topic_id, callback){
//     const query = {'topic_id':topic_id};
//     model.findOne(query, callback);
// };

// creates a new comment
module.exports.addDiscussion = function(newDiscussion, callback) {
    newDiscussion.save(callback); // saves to the db
};

// creates a new comment
module.exports.addComment = function(discussion, newComment, callback) {
    discussion.comments.push(newComment);
    discussion.save(callback); // saves to the db
};