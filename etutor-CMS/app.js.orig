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

// var uri = 'mongodb://martin:{Tw3ntyS3v3nt33nAtl@$}@'+
// 'mycluster0-shard-00-00.mongodb.net:27017,'+
// 'mycluster0-shard-00-01.mongodb.net:27017,'+
// 'mycluster0-shard-00-02.mongodb.net:27017/admin?ssl=true&replicaSet=Mycluster0-shard-0&authSource=admin';
    // mongo "mongodb://etutor-shard-00-00-blwdi.mongodb.net:27017,etutor-shard-00-01-blwdi.mongodb.net:27017,etutor-shard-00-02-blwdi.mongodb.net:27017/test?replicaSet=etutor-shard-0" --ssl --authenticationDatabase admin --username martin --password {Tw3ntyS3v3nt33nAtl@$}"
//     var options = {
//     ssl: true,
//         authSource: 'admin',
//         replicaSet: 'Mycluster0-shard-0'
// };

mongoose.connect(config.database).then(() => {
    // return server.start();
}).catch(err => { //handle mongoose connect error
    console.error('App starting error:', err.stack);
    // setTimeout(connectWithRetry, 5000);
    // connectWithRetry();
    process.exit(1);
});

// var connectWithRetry = function() {
//     return mongoose.connect(config.database, function(err) {
//         if (err) {
//             console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
//             setTimeout(connectWithRetry, 5000);
//         }
//     });
// };
// connectWithRetry();


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

// handles listening to the specified port and starts server
app.listen(port, () => {
    console.log('Server started on port '+ port);
});