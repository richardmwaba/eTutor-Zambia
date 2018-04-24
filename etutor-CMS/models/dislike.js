// Defines the dislikes model

const mongoose = require('mongoose');

// reaction schema
const DislikeSchema = module.exports =  mongoose.Schema({
    _id                     :   {type: mongoose.Schema.Types.ObjectId},
    count                     :Number,
    dislikers                     :[],
});

const model =  mongoose.model('Dislike', DislikeSchema);
module.exports.getModel = model;

// get all reactions
module.exports.getAllDislikes = function(callback) {
    model.find({}, callback);
};

// creates a new reaction
module.exports.addDislike = function(newReaction, callback) {
    newReaction.save(callback); // saves to the db
};

//find a reaction with given match
module.exports.findMatch = function(reaction_id, callback) {
    const query = {'_id':reaction_id};
    model.findOne(query, callback);
};