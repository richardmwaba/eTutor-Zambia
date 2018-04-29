/**
 * This file will hold all functions related to videos 
 * on the apps local database (mongo db). 
 */

const mongoose = require('mongoose');
const config = require('../config/database');

// video local database schema
const VideoSchema= module.exports = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    url: String,
    name: String,
});

const Video_model = mongoose.model('Video', VideoSchema);
module.exports.getModel = Video_model;

/* local database functions (get, post, edit, delete,) */

// creates an new video record
 module.exports.AddVideo = (data, callback) => {
    const access_level = {
        name: data.name,
        url: data.uri,
    };

    Video_model.create(callback);
 }

 // gets all the videos from the db
 module.exports.getVideos = (limit, callback) => {
     Video_model.find(callback).limit(limit);
 }

 // get a particular video from the db
 module.exports.getAVideo = (id, callback) => {
     Video_model.findById(id, callback);
 }

 // deletes an video record from db
 module.exports.removeVideo = (id, callback) => {
    Video_model.remove({_id: id}, callback);
}
