// Defines the subjects model

const mongoose = require('mongoose');

// subject schema
const CommentSchema = module.exports =  mongoose.Schema({
    _id                     :   {type: mongoose.Schema.Types.ObjectId},
    title                     :String,
    user_email                    :   String,
    username                    :   String,
    message                   :   String,
    likes              :   Number,
    likedBy              :   [],
    dislikes              :   Number,
    dislikedBy              :   [],
});

const model = mongoose.model('Comment', CommentSchema);
module.exports.model = CommentSchema;

// get all comments
module.exports.getAllComments = function(callback) {
    model.find({}, callback);
};

// // get a comment
// module.exports.getAllComments = function(callback) {
//     model.findOne({}, callback);
// };

// creates a new comment
module.exports.addComment = function(newComment, callback) {
    newComment.save(callback); // saves to the db
};