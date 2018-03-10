// Defines the coupon model

const mongoose = require('mongoose');
var coupon = require("coupon");
const config = require('../config/database');

// Coupon schema
const SubscriptionSchema =  mongoose.Schema({
    _id                     :   {type: mongoose.Schema.Types.ObjectId},
    couponKey                     :   String,
    subjectId                    :   String,
    userEmail                   :   String,
    expirationDate                     :   Date,
    plan                     :   String,
});

const model = mongoose.model('Subscription', SubscriptionSchema);
module.exports.getModel = model;

// get all Coupons
module.exports.getAllSubscriptions = function(callback) {
    model.find({}, callback);
};

// get find subscription with given parameters
module.exports.findMatch = function(subjectId, userEmail, callback) {
    const query = {'subjectId':subjectId, 'userEmail':userEmail}
    model.findOne(query, callback);
};

// creates Coupon
module.exports.addSubscription = function(newSubscription, callback) {

    newSubscription.save(callback); // saves to the db
};

//removes a subscription
module.exports.remove = function(id, callback) {

    model.remove({ '_id': id }, callback)
};