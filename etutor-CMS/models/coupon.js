// Defines the coupon model

const mongoose = require('mongoose');
var coupon = require("coupon");
const config = require('../config/database');
const topic_schema = require('../models/topic');

// Coupon schema
const CouponSchema =  mongoose.Schema({
    _id                     :   {type: mongoose.Schema.Types.ObjectId},
    key                     :   String,
    name                    :   String,
    service                   :   String,
    seller              :   String,
    countMax             :   Number,
    discount                :   String,
    expirationDate                     :   Date,
});

const Coupon = module.exports = mongoose.model('Coupon', CouponSchema);

// get all Coupons
module.exports.getAllCoupons = function(callback) {
    Coupon.find({}, callback);
};

// gets Coupon by the id
module.exports.getCouponById = function(id, callback) {
    Coupon.findById(id, callback);
};

// gets user by the email
module.exports.getCouponByName = function(name, callback) {
    const query = {name: name}; // query to equate name to db Coupon name
    Coupon.findOne(query, callback);
};

// creates Coupon
module.exports.addCoupon = function(newCoupon, callback) {

    newCoupon.save(callback); // saves to the db
};