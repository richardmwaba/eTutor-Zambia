/**
 * This handles all the Coupon's routes
 */
"use strict";
const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');                     // mongoose for mongodb
var coupon = require("coupon");

const Subscription = require('../models/subscription');

//get all coupons
router.get('/all', (req, res, next) => {
// add to db
    Subscription.getAllSubscriptions((err, subscriptions) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to get subscription'});
        } else {
            // if success
            res.json(subscriptions);
        }
    });
});


module.exports = router;