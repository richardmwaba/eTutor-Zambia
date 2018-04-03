// Defines the topics model

const mongoose = require('mongoose');
const config = require('../config/database');

// topic schema
const VideoSchema= module.exports = mongoose.Schema({
        _id                     :   {type: mongoose.Schema.Types.ObjectId},
        name                     :   String,
        url                     :   String
});

const model = mongoose.model('Video', VideoSchema);
module.exports.getModel = model;