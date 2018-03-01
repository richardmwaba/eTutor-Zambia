/**
 * Holds info on the access level of the users
 */

 const mongoose = require('mongoose');
 const config = require('./config/database');

 const accessLevelSchema = mongoose.Schema({
     name: { type: String },
     access_id: { type: Number },  // is the integer value of an access level
     access_rights: [ String ]
 });

 const Access_level = module.exports = mongoose.model('Access_level', accessLevelSchema);

 // gets all existing access levels from the collection
module.exports.getAccessLevels = (callback, limit) => {
    Access_level.find(callback).limit(limit);
}

 // gets an access level by the access object id
 module.exports.getAccessById = (id, callback) => {
     Access_level.findById(id, callback);
 }

 // get an access level by its integer representation - access_id
 module.exports.getAccessByRep = (accessId, callback) => {
     const query = {access_id: accessId};

     // finds the matching the
     Access_level.findOne(query, callback);
 }

 // creates an new access level
 module.exports.addAccessLevel = (data, callback) => {
    const access_level = {
        name: data.name,
        access_id: data.level,
        access_rights: data.rights  // must be an array
    };

    Access_level.create(callback);
 }

 // creates an new access level
 module.exports.updateAccessLevel = (id, data, options, callback) => {
    const query = {_id: id};

    const update = {
        name: data.name,
        access_id: data.level,
        access_rights: data.rights  // must be an array
    };

    Access_level.findOneAndUpdate(query, update, options, callback);
 }

 // deletes an access level record
 module.exports.removeAcess = (id, callback) => {
     Access_level.remove({_id: id}, callback);
 }