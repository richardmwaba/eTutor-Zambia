/**
 * This file is the model of the payment plans
 */

const mongoose = require('mongoose');
const config = require('./config/database');

const paymentPlanSchema = mongoose.Schema({
    name: { type: String },  // name of plan e.g. daily, weekly e.t.c
    duration: { type: Number }
});

const Payment_plan = module.exports = mongoose.model('Payment_plan', paymentPlanSchema);

// functions related to this model

// gets all existing payment plans from db
module.exports.getPaymentPlans = (callback, limit) => {
    Payment_plan.find(callback).limit(limit);
}

// gets a single payment plan by its id
module.exports.getPaymentPlanById = (id, callback) => {
    Payment_plan.findById(id, callback);
}