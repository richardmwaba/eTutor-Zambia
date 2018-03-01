//Dependancies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to MongoDB Database
mongoose.connect(config.database);

//Check connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
});

//show error id present
mongoose.connection.on('error', () => {
    console.log('Database error: '+err);
});
 
//Initiate app variable with express
const app = express();

//Initiate Routes
const users = require('./routes/users');
const customers = require('./routes/userRoutes');
const lessons = require('./routes/lessons');

//Port Number
const port = 3000;

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

//Start Server
app.listen(port, () => {
    console.log('Server started on port '+port )
});