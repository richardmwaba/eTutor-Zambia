/**
 * This is the video data model and also contains functions that 
 * interact with the vimeo API
 */

const mongoose = require('mongoose');
const config = require('../config/database');
const vimeo_config = require('../config/vimeo');
const Vimeo = require('vimeo').Vimeo;

// video local database schema
const VideoSchema= module.exports = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    url: String
});

const model = mongoose.model('Video', VideoSchema);
module.exports.getModel = model;

// creating a vimeo client object, used to make requests to the API
const client = new Vimeo(vimeo_config.id, vimeo_config.secret, vimeo_config.token);

/* local database functions (get, post, edit, delete,) */

// gets all video records from the db


/* Vimeo API requests */
// upload a video comind soon
module.exports.uploadVideo = (callback) => {
    client.upload(
        'E:/vimeo test.mp4',
        function (uri) {
          console.log('File upload completed. Your Vimeo URI is:', uri)
        },
        function (bytesUploaded, bytesTotal) {
          var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
          console.log(bytesUploaded, bytesTotal, percentage + '%')
        },
        function (error) {
          console.log('Failed because: ' + error)
        }
    )
}

module.exports.uploadV = (callback) => {
    client.upload({
        path: 'E:/vimeo test.mp4',
        name: 'Intro test 2',
        description: 'for upload testing'
    }, (err, uri, bytesUploaded, bytesTotal) => {
        if(err) {
            console.log('Cant upload, ERROR: ' + err);
        } else {
            callback(uri, bytesUploaded, bytesTotal);
        }
    })
}

// add video to album
module.exports.addVideoToAlbum = (album_id, video_id, callback) => {
    client.request({ //options
        path: '/me/albums/album_id/videos/video_id', // must be a put request
    }, (error, video, status_code, headers) => {
        if(error) {
            console.log(error);
        } else {
            callback(video); // successfully uploaded
        }
    });
}

// get the available albums(vimeo's version of playlsts)
module.exports.getAlbums = (callback) => {
    client.request(/*options*/{
        path: '/me/albums', // gets all albums in this account (rich's)
        query: {
            page: 1,
            per_page: 10,
            fields: 'uri,name,description,created_time' // only gets these details
        }
    }, /*callback*/(error, albums, status_code, headers) => {
        if(error) {
            console.log(error);
        } else {
            callback(albums);
        }
    });
}

// gets all videos in particular album
module.exports.getVideosInAlbum = (id, callback) => {
    client.request({ 
        path: '/me/album/id/videos', // id is a parameter
        query: {
            page: 1,
            per_page: 10,
            fields: 'uri,name,duration,created_time,modifies_time'
        }
    }, /* callback*/ (error, videos, status_code, headers) => {
        if(error) {
            console.log(error);
        } else {
            callback(videos); // returns videos in that album
        }
    });
}

// gets a videos in particular album
module.exports.getVideos = (callback) => {
    client.request(/*options*/{
        // This is the path for the videos contained within the staff picks
        // channels
        path: '/me/album/album_id/videos/video_id',
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

