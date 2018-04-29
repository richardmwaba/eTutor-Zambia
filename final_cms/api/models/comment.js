// Defines the subjects model

const mongoose = require('mongoose');
const ReviewersSchema = require('../models/reviewers');

// subject schema
const CommentSchema = module.exports =  mongoose.Schema({
    _id                     :   {type: mongoose.Schema.Types.ObjectId},
    title                     :String,
    username                    :   String,
    message                   :   String,
    likes              :   Number,
    dislikes              :   Number,
    reviewers              :   [ReviewersSchema]
});

const model = mongoose.model('Comment', CommentSchema);
module.exports.getModel = model;

// get all comments
module.exports.getAllComments = function(callback) {
    model.find({}, callback);
};

module.exports.addComment = function(newComment, callback) {
    newComment.save(callback); // saves to the db
};