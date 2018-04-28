// app dependencies 
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./config/database');  // database config file

// Connect to database
mongoose.Promise = global.Promise;

mongoose.connect(config.database).then(() => {
    // return server.start();
}).catch(err => { //handle mongoose connect error
    console.error('App starting error:', err.stack);
    // setTimeout(connectWithRetry, 5000);
    // connectWithRetry();
    process.exit(1);
});


// On connection, if successful
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

//On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});

// initializing app with express
const app = express();

// Route files
const users = require('./routes/userRoutes');
const subjects = require('./routes/subjectRoutes');
const coupons = require('./routes/couponRoutes');
const subscriptions = require('./routes/subscriptionRoutes');
const discussions = require('./routes/dicussionRoutes');

// default port variable
const port = 3000;

// CORS middleware
app.use(cors());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// bodyParser middleware
app.use(bodyParser.json());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// route paths
app.use('/users', users);
app.use('/subjects', subjects);
app.use('/coupons', coupons);
app.use('/subscriptions', subscriptions);
app.use('/discussions', discussions);

// handles listening to the specified port and starts server
app.listen(port, () => {
    console.log('Server started on port '+ port);
});