/**
 * This handles all the Coupon's routes
 */
"use strict";
const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');                     // mongoose for mongodb
var coupon = require("coupon");

const Coupon = require('../models/coupon');

//get all coupons
router.get('/all', (req, res, next) => {
// add to db
    Coupon.getAllCoupons((err, coupons) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to get Coupon'});
        } else {
            // if success
            res.json(coupons);
        }
    });
});

//get all active coupons
router.get('/active', (req, res, next) => {
// add to db
    Coupon.getCouponByGrade(req.params.grade, (err, coupon) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to get Coupon'});
        } else {
            // if success
            res.json(coupon);
        }
    });
});

//get Coupon
router.get('/pending', (req, res, next) => {
// add to db
    Coupon.getCouponById(req.params.id, (err, Coupon) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to get Coupon'});
        } else {
            // if success
            res.json(Coupon);
        }
    });
});

//generates new coupon and saves it to the database
router.get('/generate/:numberOfCoupons', (req, res, next) => {
    let i = req.params.numberOfCoupons;
    while(i>0) {
        let newCoupon = new Coupon(
            coupon("eTutor")
            .give("free")
            .limit(1)
            .person("Mr. Fetus")
            .only("Banana")
            .expire(new Date(2015, 0, 1))
    );
// add to db
        Coupon.addCoupon(newCoupon, (err, coupon) => {
            // check for errors
            if (err) {
                res.json({success: false, msg: err.stack});
            } else {
                // if success
               // res.json(coupon);
            }
        });
        i--;
    }
    //return all the coupons when completed
    Coupon.getAllCoupons((err, coupons) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to get Coupon'});
        } else {
            // if success
            res.json(coupons);
        }
    });

});

// delete a Coupon
router.delete('/delete/:couponId', function(req, res) {
    Coupon.remove({_id : req.params.couponId}, (err, coupon) =>{
        if(err) {
            res.json(err.message);
        }else {
            res.json(coupon);
        }

    });
});

module.exports = router;

