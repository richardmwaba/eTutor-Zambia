/**
* This handles all the access level routes
*/
const express = require('express');
const router = express.Router();
const config = require('../config/database');

const Videos = require('../models/video');

router.get('/', (req, res, next) => {
    Videos.getVideos((err, videos, status_code, headers) => {
        if(err) {
            res.send(err);
        } else {
            res.json(videos, status_code, headers);  // returns all the records
        }
    })
});

router.get('/albums', (req, res, next) => {
    Videos.getAlbums((err, albums, status_code, headers) => {
        if(err) {
            res.send(err);
        } else {
            res.json(albums, status_code, headers);  // returns all the records
        }
    })
});

module.exports = router; // ensures that methods can be used outside this file
