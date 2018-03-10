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

const model = mongoose.model('Coupon', CouponSchema);
module.exports.getModel = model;

// get all Coupons
module.exports.getAllCoupons = function(callback) {
    model.find({}, callback);
};

// gets Coupon by the id
module.exports.getCouponById = function(id, callback) {
    model.findById(id, callback);
};

// gets coupon by key
module.exports.getCouponByKey = function(key, callback) {
    const query = {'key': key}; // query to equate key to db Coupon key
    model.findOne(query, callback);
};

// creates Coupon
module.exports.addCoupon = function(newCoupon, callback) {

    newCoupon.save(callback); // saves to the db
};

//removes a subscription
module.exports.remove = function(key, callback) {

    model.remove({ 'key': key }, callback)
};