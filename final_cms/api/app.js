//Dependancies
// const cool = require('cool-ascii-faces');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const schedule = require("node-schedule");
const compression = require('compression');
const subscriptions_scheduler = require('./subscriptions_scheduler');
const config = require('config');
const verifyToken = require('./routes/auth/verifyToken');


//Connect to MongoDB Database
if(config.has('database.host')){
mongoose.connect(config.get('database.host'));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to database '+config.get('database.host'));
});
}


//get the time to run the scheduler
const rule = new schedule.RecurrenceRule();
if(config.has('server.SECHEDULED_TIME')){
rule.hour = config.has('SCHEDULED_TIME');
//add jobs to the scheduler
schedule.scheduleJob(rule,subscriptions_scheduler.checkSubscriptions);
}

//Port Number
const port = 3000;

//Initiate app variable with express
const app = express();

//Initiate Routes
const users = require('./routes/userRoutes');
const superusers = require('./routes/users');
// const customers = require('./routes/userRoutes');
const subjects = require('./routes/subjectRoutes');
const videos = require('./routes/videoRoutes');
const coupons = require('./routes/couponRoutes');
const subscriptions = require('./routes/subscriptionRoutes');
const discussions = require('./routes/dicussionRoutes');
const categories = require('./routes/subjectCategoryRoutes');

app.use(compression()); //Compress all routes

//CORS Middleware
app.use(cors({
    origin: '*'
}));

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

app.use('/users', users);
app.use('/videos', videos);
app.use('/coupons',verifyToken, coupons);
app.use('/subscriptions',verifyToken, subscriptions);
app.use('/discussions',verifyToken, discussions);
app.use('/subjects', subjects);
app.use('/superusers', superusers);
app.use('/categories', categories);

//Start Server
app.listen(config.get('server.port') || port, () => {
    console.log("Express server listening on port %d in %s mode and schedule at %d", config.get('server.port') || port, app.settings.env, config.get('server.SCHEDULED_TIME'));
});

module.exports = app; // for testing