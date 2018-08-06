// Defines the users model
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const subject = require('../models/subject');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

// user schema
const UserSchema = module.exports= mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String, required: true
    },
    title: {
        type: String // changed to not required
    },
    email: {
        type: String, required: true,
        unique: true,
        validate: [ validator.isEmail, 'invalid email' ]
    },
    username: {
        type: String, required: true,
        unique: true// may need to make this unique
    },
    password: {
        type: String, 
        required: true
    },
    phone: {
        type: String, 
        required: true
    },
    reset_password_token: {
        type: String
    },
    reset_password_expires: {
        type: Date
    },
    mySubjects: {
        type: [subject.getSchema] // e.g. student can have either an 'active' or 'inactive' status
    }
});

UserSchema.plugin(uniqueValidator, { message: '{VALUE} has been taken.' });

const User = mongoose.model('User', UserSchema);
module.exports.getModel = User;

// gets user by the id
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
};

// gets user by the email
module.exports.getUserByEmail = function(email, callback) {
    const query = {email: email}; // query to equate email to db username
    User.findOne(query, callback);
};

// gets user by username
module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username}; // query to equate usernames

    // finds user in db
    User.findOne(query, callback);
};

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
};

// get all Coupons
module.exports.getAllUsers = function(callback) {
    User.find({}, callback);
};

// compares passwords
module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        // if(err) @throws err;

        callback(null, isMatch);
    });
};

//removes a user
module.exports.remove = function(_id, callback) {

    User.remove({ '_id': _id }, callback)
};

module.exports.addToMySubjects = function (updatedUser, callback) {
    updatedUser.save(callback);
};

module.exports.removeFromMySubjects = function (updatedUser, callback) {
    updatedUser.save(callback);
};

mongoose.model('User', UserSchema);