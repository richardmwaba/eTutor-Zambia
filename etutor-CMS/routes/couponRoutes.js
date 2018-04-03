/**
 * This handles all coupon generation logic
 */
const express = require('express');
const router = express.Router();
const config = require('../config/database');

const Coupon = require('../models/coupon');

router.get('/generate', (req, res, next) => {
    Coupon.generateCoupons((err, coupons) => {
        if(err) {
            res.send(err);
        } else {
            res.json(coupons);  // returns all the records
        }
    })
});

module.exports = router;