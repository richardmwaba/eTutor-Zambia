/**
 * Holds info on coupons
 */

const mongoose = require('mongoose');
const config = require('../config/database');
let coupon = require("voucher-code-generator");
const topic_schema = require('../models/topic');

// Coupon schema
const CouponSchema =  mongoose.Schema({
    _id                     :   {type: mongoose.Schema.Types.ObjectId},
    key                     :   String,
    type                   :   String,
    seller              :   String,
    countMax             :   Number,
    duration                     :   Number,
    duration_unit                     :   String,
});

const Coupon = mongoose.model('Coupon', CouponSchema);
module.exports.getModel = Coupon;

 // gets all Coupons from the collection
module.exports.getCoupons = (callback, limit) => {
    Coupon.find(callback).limit(limit);
};

// get all Coupons
module.exports.getAllCoupons = function(callback) {
    Coupon.find({}, callback);
};

// gets Coupon by the id
module.exports.getCouponById = function(id, callback) {
    model.findById(id, callback);
};

// gets coupon by key
module.exports.getCouponByKey = function(key, callback) {
    const query = {'key': key}; // query to equate key to db Coupon key
    Coupon.findOne(query, callback);
};

// creates Coupon
module.exports.addCoupon = function(newCoupon, callback) {

    newCoupon.save(callback); // saves to the db
};