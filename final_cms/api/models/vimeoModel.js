/**
 * This is the video data model and also contains functions that 
 * interact with the vimeo API
 */

const mongoose = require('mongoose');
const config = require('../config/database');
const vimeo_config = require('../config/vimeo');
const Vimeo = require('vimeo').Vimeo;

// module.exports = VimeoAPI;

// creating a vimeo client object, used to make requests to the API
const client = new Vimeo(vimeo_config.id, vimeo_config.secret, vimeo_config.token);

/* Vimeo API requests */
// upload a video comind soon (provide upload quote check)
module.exports.uploadVideo = (data, callback) => {
    // extract the data
    const filePath = data.path;  // the full path of the video
    const params = {  // the video title adn description
        name : data.name,
        description : data.description
    };

    // upload to vimeo
    client.upload(
        filePath,
        params,
        function (uri) {
            // Get metadata response
            client.request(uri + '?fields=link', (error, body, statusCode, headers) => {
                if (error) {
                  console.log('There was an error making the request.')
                  console.log('Server reported: ' + error)
                  return
                }

                console.log('"' + filePath + '" has been uploaded to ' + body.link);

                // Make an API call to edit the title and description of the video.
                client.request({
                    method: 'PATCH',
                    path: uri,
                    params,
                }, (error, body, statusCode, headers) => {
                    if (error) {
                    console.log('There was an error making the request.')
                    console.log('Server reported: ' + error)
                    return
                    }

                    console.log('The title and description for ' + uri + ' has been edited.');
                    callback(body); // trying to get the body object to output in postman
                });
            });

        },
        function (bytesUploaded, bytesTotal) {
          var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
          console.log(bytesUploaded, bytesTotal, percentage + '%')
        }, function (error) {
          console.log('Failed because: ' + error)
        }
    ); // end upload
} // end function

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
        path: '/me/videos',
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
        // console.log('status code');
        // console.log(status_code);
        // console.log('headers');
        // console.log(headers);
      }
    );
    
}

