// Defines the coupon model

const mongoose = require('mongoose');
var coupon = require("coupon");
const config = require('../config/database');

// Coupon schema
const SubscriptionSchema =  mongoose.Schema({
    _id                     :   {type: mongoose.Schema.Types.ObjectId},
    couponKey                     :   String,
    subjectId                    :   String,
    userId                   :   String,
    expirationDate                     :   Date,
});

const model = mongoose.model('Subscription', SubscriptionSchema);
module.exports.getModel = model;

// get all Coupons
module.exports.getAllSubscriptions = function(callback) {
    model.find({}, callback);
};

// creates Coupon
module.exports.addSubscription = function(newSubscription, callback) {

    newSubscription.save(callback); // saves to the db
};