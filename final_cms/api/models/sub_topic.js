// Defines the topics model

const mongoose = require('mongoose');
const config = require('../config/database');
const video_schema = require('../models/video');

// topic schema
const SubTopicSchema = module.exports = mongoose.Schema({
        _id                     :   {type: mongoose.Schema.Types.ObjectId},
        name                    :   String,
        videos                  :   [video_schema]
});

const model = mongoose.model('SubTopic', SubTopicSchema);
module.exports.getModel = model;

module.exports.addVideo = function(subject, subTopic, video, callback) {
    subTopic.videos.push(video); // pushes to the topics array;
    subject.save(callback); // saves to the db
};