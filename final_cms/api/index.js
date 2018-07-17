const dateMath = require('date-arithmetic');
const schedule = require("node-schedule");

const Subscription = require('./models/subscription');
const Coupon = require('./models/coupon');


//remove all subscription entries that have expired
let j = schedule.scheduleJob({hour: 23, minute: 9, dayOfWeek: 2},checkSubscriptions());

function checkSubscriptions(){
    let subscriptions = getAllSubscriptions();
    let today = new Date;

    //check all subscriptions if there are any
    if(subscriptions) {
        subscriptions.forEach(function (subscription) {
            if ((dateMath.lte(subscription.expirationDate, today))) {
                deleteSubscription(subscription);
            }
        });
    }

}
//get all subscriptions for processing
function getAllSubscriptions() {
    Subscription.getAllSubscriptions((err, subscriptions) => {
        // check for errors
        if (err) {
            return null;
        } else {
            // if success
            return subscriptions;
        }
    });
}

//delete subscription
function deleteSubscription(subscription){
    // remove from db
    Subscription.remove(subscription._id, (err, subscriptions) => {
        // check for errors
        if (err) {
            return false;
        } else {
            // if success
            console.log("deleted "+subscriptions.userEmail);
            // return true;
        }
    });

}