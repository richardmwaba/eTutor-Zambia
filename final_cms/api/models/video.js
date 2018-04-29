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
    album: String  // hold the album the videos is in
});

const model = mongoose.model('Video', VideoSchema);
module.exports.getModel = model;

/* local database functions (get, post, edit, delete,) */

// gets all video records from the db
