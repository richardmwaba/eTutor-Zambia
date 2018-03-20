// Defines the video database schema and functions
// related to vimeo API interaction

const mongoose = require('mongoose');
const config = require('../config/database');
const vimeo_config = require('../config/vimeoApp');
const Vimeo = require('vimeo').Vimeo;

// creating a vimeo client object
const client = new Vimeo(vimeo_config.id, vimeo_config.secret, vimeo_config.token);

// video database schema
const VideoSchema= module.exports = mongoose.Schema({
        _id: {type: mongoose.Schema.Types.ObjectId},
        url: String
});

const model = mongoose.model('Video', VideoSchema);
module.exports.getModel = model;

const test_album_ID = '5018132';  // this is a test album setup on vimeo

// functions related to videos and vimeo

// uploading a video to a specific album


// gets all videos in this channel
module.exports.getVideos = (callback) => {
    client.request(/*options*/{
        // This is the path for the videos contained within the staff picks
        // channels
        path: '/channels/staffpicks/videos',
        // This adds the parameters to request page two, and 10 items per
        // page
        query: {
          page: 2,
          per_page: 10,
          fields: 'uri,name,description,duration,created_time,modified_time'
        }
      }, /*callback*/ (error, body, status_code, headers) => {
        if (error) {
          console.log('error');
          console.log(error);
        } else {
        //   console.log('body');
        //   console.log(body);
        callback(body, status_code, headers);
        }
      
        console.log('status code');
        console.log(status_code);
        console.log('headers');
        console.log(headers);
      }
    );
    
}

