/**
 * Holds info on the access level of the users
 */

const mongoose = require('mongoose');
const config = require('../config/database');

const couponSchema = mongoose.Schema({
    name: { type: String },
    id: { type: String },  // this is the unique coupon code
    countMax: { type: Number },
    discount: { type: Number },
    expirationDate: { type: Date },
    service: {type: mongoose.Schema.Types.ObjectId},
    user: {type: mongoose.Schema.Types.ObjectId}
});

const Coupon = module.exports = mongoose.model('Coupon', couponSchema);

// gets all Coupons from the collection
module.exports.getCoupons = (callback, limit) => {
    Coupon.find(callback).limit(limit);
};

// generate coupons
module.exports.generateCoupons = (callback, limit) => {
    var coupon = require("coupon");
    var myCoupon = coupon("GREAT-30")
        .give("free")
        .limit(10)
        .person("Mr. Fetus")
        .only("Banana")
        .expire(new Date(2015, 0, 1));
    callback(myCoupon.json());
};