// Defines the users model

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// user schema
const UserSchema = module.exports= mongoose.Schema({
    f_name: {
        type: String, required: true
    },
    l_name: {
        type: String, required: true
    },
    title: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    username: {
        type: String, required: true // may need to make this unique
    },
    password: {
        type: String, required: true
    },
    phone: {
        type: String, required: true
    }
});

const User = mongoose.model('User', UserSchema);
module.exports.getModel = User;

// gets user by the id
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

// gets user by the email
module.exports.getUserByEmail = function(email, callback) {
    const query = {email: email}; // query to equate email to db username
    User.findOne(query, callback);
}

// gets user by username
module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username}; // query to equate usernames

    // finds user in db
    User.findOne(query, callback);
}

// creates user
module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) {
                console.log(err);
            }  // throws error

            newUser.password = hash;  // this is the hashed password
            
            newUser.save(callback); // saves to the sb
        });
    });
}

// compares passwords
module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        // if(err) @throws err;

        callback(null, isMatch);
    });
}