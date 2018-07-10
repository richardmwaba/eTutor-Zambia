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
const compression = require('compression');

//Connect to MongoDB Database
mongoose.connect(config.database);

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
// app.get('/cool', (req, res) => res.send(cool()));

//Start Server
app.listen(process.env.PORT || port, () => {
    console.log("Express server listening on port %d in %s mode", process.env.PORT || port, app.settings.env);
});