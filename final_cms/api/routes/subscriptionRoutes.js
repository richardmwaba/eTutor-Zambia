/**
 * This handles all the Coupon's routes
 */
"use strict";
const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');                     // mongoose for mongodb
var coupon = require("coupon");

const Subscription = require('../models/subscription');
const Coupon = require('../models/coupon');

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

//subscribe user to this subject
router.post('/subscribeUser', (req, res, next) => {

    //check if this coupon is valid
    Coupon.getCouponByKey(req.body.couponKey, (err, coupon) => {
        // check for errors
        if (err || coupon==null) {
            res.json({success: false, msg: 'Invalid coupon used for '});
        } else {
            // res.json(coupon);
            //if success
            let newSubscription = new Subscription.getModel({
                _id: mongoose.Types.ObjectId(),
                expirationDate: coupon.expirationDate,
                couponKey: coupon.key,
                subjectId: req.body.subjectId,
                userEmail:   req.body.userEmail,
                plan: req.body.plan
            });
            //create subscription entry
            Subscription.addSubscription(newSubscription, (err, subscription) => {
                // check for errors
                if (err) {
                    res.json({success: false, msg: 'Failed to subscribe for '});
                } else {
                    // if success delete the used coupon from database
                    Coupon.remove(req.body.couponKey, (err, coupon) => {
                        //check for errors
                        if(err){
                            res.json({success: false, msg: 'Failed to subscribe for '});
                        }else{
                            res.json({success: true, msg: 'You have successfully subscribed for '});
                        }
                    });
                    //res.json({success: true, msg: 'Subscribed to '+req.body.subject});
                }
            });
        }
    });
});

/**
 * param subjectID
 * param user id
 */
router.get('/verify/:subjectId/:userEmail', (req, res, next) => {
    Subscription.findMatch(req.params.subjectId, req.params.userEmail, (err, subscription)=>{
        //check for errors or if record has been found
        if(err){
            res.json({success: false, msg: 'An error occurred'})
        }
        if(subscription==null){
            res.json({success: false, msg: 'Please subscribe now to access this content.'})
        }else{
            res.json({success: true, subscription});
        }
    });
});

/**
 * param subscription id
 */
router.get('/delete/:id', (req, res, next) => {
// remove from db
    Subscription.remove(req.params.id, (err, subscriptions) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to remove subscription'});
        } else {
            // if success
            res.json(subscriptions);
        }
    });
});


module.exports = router;