// app dependencies 
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

// initializing app with express
const app = express();

// default port variable
const port = 3000;

// CORS middleware
app.use(cors());

// bodyParser middleware
app.use(bodyParser.json());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// handles listening to the specified port and starts server
app.listen(port, () => {
    console.log('Server started on port '+ port);
});