/**
* This handles all the access level routes
*/
const express = require('express');
const router = express.Router();
const config = require('../config/database');

const Videos = require('../models/video');
const Vimeos = require('../models/vimeoModel');
 
router.get('/', (req, res, next) => {
    Vimeos.getVideos((err, videos, status_code, headers) => {
        if(err) {
            res.send(err);
        } else {
            res.json(videos, status_code, headers);  // returns all the records
        }
    })
});

router.get('/albums', (req, res, next) => {
    Vimeos.getAlbums((err, albums, status_code, headers) => {
        if(err) {
            res.send(err);
        } else {
            // todo: Get data-<object> from albums
            res.json(albums, status_code, headers);  // returns all the records
        }
    })
});

router.post('/upload', (req,res, next) => {
    Vimeos.uploadVideo((err, video, status_code, headers) => {
        if(err) {
            res.send(err);
        } else {
            res.json(video);
        }
    });
});

// testing upload
router.post('/testupload', (req,res, next) => {
    Vimeos.uploadV((err, uri, bUplaoded, bTotal) => {
        if(err) {
            res.send(err);
        } 

        if (bUploaded != bTotal) {
            res.send('still uploading');
        } else {
            res.json({
                URI: uri,
                status: 'Complete ' + bTotal + ' uploaded',
            });
        }
    })
})

module.exports = router; // ensures that methods can be used outside this file
