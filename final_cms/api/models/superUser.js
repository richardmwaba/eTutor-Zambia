/**
 * Defines the super user model
 */

//Dependancies
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Super User Schema
const SuperUserSchema = mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String
    },
    address: {
        type: String
    },
    group: {
        type: String,
        required: true
    } 
},{
    collection: 'superusers'
});

//Export Module
const SuperUser = module.exports = mongoose.model('SuperUser', SuperUserSchema);

//Get Super User By Id
module.exports.getSuperUserById = function(id, callback){
    SuperUser.findById(id, callback);
}

//Get Super User By Name
module.exports.getSuperUserByName = function(username, callback){
    const query = {username: username};
    SuperUser.findOne(query, callback);
}

//Add Super User
module.exports.addSuperUser = function(newSuperUser,callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newSuperUser.password, salt, (err, hash) => {
            if(err) throw err;
            newSuperUser.password = hash;
            newSuperUser.save(callback);
        });
    });
}

//Compare Super User Password
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}
