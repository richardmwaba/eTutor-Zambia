//Dependancies
// const cool = require('cool-ascii-faces');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const mongoose = require('mongoose');
const config = require('./config/database');
const dateMath = require('date-arithmetic');
const schedule = require("node-schedule");
const compression = require('compression');
const subscriptions_scheduler = require('./subscriptions_scheduler');
require('dotenv').config();

//Connect to MongoDB Database
mongoose.connect(config.database);


//get the time to run the scheduler
let rule = new schedule.RecurrenceRule();
rule.hour = process.env.SCHEDULED_TIME;
//add jobs to the scheduler
schedule.scheduleJob(rule,subscriptions_scheduler.checkSubscriptions);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to database '+config.database);
});

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

//Port Number
const port = 5000;

app.use(compression()); //Compress all routes

//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middelware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users', users);
app.use('/videos', videos);
app.use('/coupons', coupons);
app.use('/subscriptions', subscriptions);
app.use('/discussions', discussions);
app.use('/subjects', subjects);
app.use('/superusers', superusers);
app.use('/categories', categories);
// app.get('/cool', (req, res) => res.send(cool()));

//Start Server
app.listen(process.env.PORT || port, () => {
    console.log("Express server listening on port %d in %s mode and schedule at %d", process.env.PORT || port, app.settings.env, process.env.SCHEDULED_TIME);
});