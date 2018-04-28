// Defines the subjects model

const mongoose = require('mongoose');

// subject schema
const ReviewerSchema = module.exports =  mongoose.Schema({
        _id: {type: mongoose.Schema.Types.ObjectId}, //user id's will be used as reviewer id's for easier searching with mongoose functions.
        hasLiked: Boolean,
        hasDisliked: Boolean
});

const model = mongoose.model('Reviewer', ReviewerSchema);
module.exports.model = ReviewerSchema;

// get all Reviewers
module.exports.getAllReviewers = function(callback) {
    model.find({}, callback);
};
// creates a new Reviewer
module.exports.addReviewer = function(newReviewer, callback) {
    newReviewer.save(callback); // saves to the db
};