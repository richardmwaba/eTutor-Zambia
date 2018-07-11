const Subscription = require('./models/subscription');
const Coupon = require('./models/coupon');
const dateMath = require('date-arithmetic');

//remove all subscription entries that have expired
module.exports.checkSubscriptions = ()=>{

    let subscriptions = getAllSubscriptions();

    console.log("Subscriptions scheduler started");
};
//get all subscriptions for processing
function getAllSubscriptions() {
    Subscription.getAllSubscriptions((err, subscriptions) => {
        // check for errors
        if (err) {
            console.log("An error occurred");
            return null;
        } else{
            // if found
            let today = new Date;
            subscriptions.forEach(function (subscription) {
                if ((dateMath.lte(subscription.expirationDate, today))) {
                    console.log(subscriptions[0].userEmail+"'s subscription has expired");
                    deleteSubscription(subscription);
                }
            });
        }
    });
}

//delete subscription
function deleteSubscription(subscription){
    // remove from db
    Subscription.remove(subscription._id, (err, subscriptions) => {
        // check for errors
        if (err) {
            console.log("Nothing deleted");
            return false;
        } else {
            // if success
            console.log(" has been deleted");
            return true;
        }
    });

}
