// Defines the likes model

const mongoose = require('mongoose');

// reaction schema
const LikeSchema = module.exports =  mongoose.Schema({
    _id                     :   {type: mongoose.Schema.Types.ObjectId},
    count                     :Number,
    likers                     :[],
});

const model =  mongoose.model('Like', LikeSchema);
module.exports.getModel = model;

// get all reactions
module.exports.getAllLikes = function(callback) {
    model.find({}, callback);
};

// creates a new reaction
module.exports.addLike = function(newReaction, callback) {
    newReaction.save(callback); // saves to the db
};

//find a reaction with given match
module.exports.findMatch = function(username, callback) {
    const query = {'likers':username};
    model.findOne(query, callback);
};