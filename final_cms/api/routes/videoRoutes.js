/**
* This handles all the access level routes
*/
const express = require('express');
const router = express.Router();
const config = require('../config/database');
const passport = require('passport');
const jwt = require('jsonwebtoken');

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

router.post('/upload', passport.authenticate('jwt', {session: false}), (req,res, next) => {
    const data = req.body; // data from 

    Vimeos.uploadVideo(data, (err, video, status_code, headers) => {
        if(err) {
            res.send(err);
        } else {
            res.json(// send back this object
                {
                    uri: video.uri,
                    name: video.name,
                    description: video.description,
                    link: video.link
                }
            );
        }
    });
});

module.exports = router; // ensures that methods can be used outside this file
