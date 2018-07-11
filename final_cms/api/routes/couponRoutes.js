 /** This handles all the Coupon's routes
 */
"use strict";
const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');                     // mongoose for mongodb
let coupon = require('voucher-code-generator');
 const passport = require('passport');

const Coupon = require('../models/coupon');
const Subscription = require('../models/subscription');

//get all coupons
router.get('/all', (req, res, next) => {
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
router.get('/active', passport.authenticate('jwt', {session: false}), (req, res, next) => {
// add to db
    Coupon.getCouponByKey(req.params.key, (err, coupon) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to get Coupon'});
        } else {
            // if success
            res.json(coupon);
        }
    });
});

// //get Coupon
// router.get('/pending', passport.authenticate('jwt', {session: false}), (req, res, next) => {
// // add to db
//     Coupon.getCouponById(req.params.id, (err, coupon) => {
//         // check for errors
//         if (err) {
//             res.json({success: false, msg: 'Failed to get Coupon'});
//         } else {
//             // if success
//             res.json(coupon);
//         }
//     });
// });
//
// //generates new coupon and saves it to the database
// router.get('/generate/:numberOfCoupons', passport.authenticate('jwt', {session: false}), generateCoupons, saveCoupons, getAllCoupons);
//
// //generate specified coupons
// function generateCoupons(req, res, next) {
//     req.generated = coupon.generate({
//         length: 12,
//         count: req.params.numberOfCoupons,
//         pattern: "###-###-###-###",
//         charset: coupon.charset("numbers"),
//     });
//     next();
// }
//
// //ave the generated coupons to db
//  function saveCoupons(req, res, next) {
//     let i = (req.params.numberOfCoupons-1);
//      for(i; i>=0; i--) {
//          let newCoupon = new Coupon.getModel({
//              _id                     :   mongoose.Types.ObjectId(),
//              key                     :   req.generated[i],
//              name                    :   "eTutor",
//              service                   :   "Video access",
//              seller              :   "Kazang",
//              countMax             :   1,
//              discount                :   "free",
//              expirationDate                     :   new Date(2015, 0, 1),
//          });
// // add to db
//          Coupon.addCoupon(newCoupon, (err, coupon) => {
//              // check for errors
//              if (err) {
//                  res.json({success: false, msg: err.stack});
//              }
//          });
//      }
//      //got to next function
//      next();
//  }
//
// function getAllCoupons(req, res, next){
//     //return all the coupons when completed
//     res.send(req.generated)
//
// }

router.post('/generate/', generate, save, getAll);

 //generate specified coupons
 function generate(req, res, next) {
     req.generated = coupon.generate({
         length: 12,
         count: req.body.numberOfCoupons,
         pattern: "###-###-###-###",
         charset: coupon.charset("numbers"),
     });
     next();
 }

 //ave the generated coupons to db
 function save(req, res, next) {
     let i = (req.body.numberOfCoupons-1);
     for(i; i>=0; i--) {
         let newCoupon = new Coupon.getModel({
             _id                     :   mongoose.Types.ObjectId(),
             key                     :   req.generated[i],
             type                   :   "One subject",
             seller              :   req.body.seller,
             countMax             :   req.body.countMax,
             duration                     :   req.body.duration,
             duration_unit                     :   req.body.duration_unit
         });
// add to db
         Coupon.addCoupon(newCoupon, (err, coupon) => {
             // check for errors
             if (err) {
                 res.json({success: false, msg: err.stack});
             }
         });
     }
     //got to next function
     next();
 }

 function getAll(req, res, next){
     //return all the coupons when completed
     res.send(req.generated)

 }


// delete a Coupon
router.delete('/delete/:couponId', passport.authenticate('jwt', {session: false}), function(req, res) {
    Coupon.remove({_id : req.params.couponId}, (err, coupon) =>{
        if(err) {
            res.json(err.message);
        }else {
            res.json(coupon);
        }

    });
});

 module.exports = router;