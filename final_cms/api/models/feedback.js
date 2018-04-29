// Defines the feedback model

const mongoose = require('mongoose');

// feedback schema
const FeedbackSchema = module.exports =  mongoose.Schema({
    _id                     :   {type: mongoose.Schema.Types.ObjectId},
    user_id                     :String,
    rating                    :  Number,
    comment                    :  String,
});

const model =  mongoose.model('Feedback', FeedbackSchema);
module.exports.getModel = model;

// get all feedback
module.exports.getAllFeedback = function(callback) {
    model.find({}, callback);
};

// creates new feedback
module.exports.addFeedback = function(newFeedback, callback) {
    model.save(callback); // saves to the db
};