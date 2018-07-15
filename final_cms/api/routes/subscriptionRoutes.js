/**
 * This handles all the Coupon's routes
 */
"use strict";
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');                     // mongoose for mongodb
const coupon = require("voucher-code-generator");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const dateMath = require('date-arithmetic');
const schedule = require("node-schedule");

const Subscription = require('../models/subscription');
const Coupon = require('../models/coupon');


//remove all subscription entries that have expired
let j = schedule.scheduleJob({hour: 23, minute: 16, dayOfWeek: 3},checkSubscriptions);
function checkSubscriptions(){
    let subscriptions = getAllSubscriptions();
    let today = new Date;

    //check all subscriptions if there are any
    if(subscriptions) {
        subscriptions.forEach(function (subscription) {
            if ((dateMath.lte(subscription.expirationDate, today))) {
                deleteSubscription(subscription);
            }
        });
    }

    }
    //get all subscriptions for processing
function getAllSubscriptions() {
    Subscription.getAllSubscriptions((err, subscriptions) => {
        // check for errors
        if (err) {
            return null;
        } else {
            // if success
            return subscriptions;
        }
    });
}

    //delete subscription
function deleteSubscription(subscription){
    // remove from db
    Subscription.remove(subscription._id, (err, subscriptions) => {
        // check for errors
        if (err) {
            return false;
        } else {
            // if success
           return true;
        }
    });

}

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
                expirationDate: dateMath.add( new Date, coupon.duration, coupon.duration_unit),
                couponKey: coupon.key,
                subjectId: req.body.subjectId,
                userEmail:   req.body.userEmail,
                plan: coupon.duration_unit
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
router.get('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
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