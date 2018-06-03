// Defines the subjects model

const mongoose = require('mongoose');
const config = require('../config/database');
const topic_schema = require('../models/topic');
const UserSchema = require('../models/user');

// subject schema
const SubjectSchema =  mongoose.Schema({
    _id                     :   {type: mongoose.Schema.Types.ObjectId},
    name                    :   String,
    grade                   :   String,
    instructors              :   [UserSchema],
    description             :   String,
    category                :   String,
    icon                     :   String,
    topics                  :   [topic_schema]
},{
    collection: 'subjects'
});

const Subject = module.exports = mongoose.model('Subject', SubjectSchema);
module.exports.getSchema = SubjectSchema;

// get all subjects
module.exports.getAllSubjects = function(callback) {
    Subject.find({}, callback);
};

// gets subject by the id
module.exports.getSubjectById = function(id, callback) {
    Subject.findById(id, callback);
};

// gets user by the email
module.exports.getSubjectByName = function(name, callback) {
    const query = {name: name}; // query to equate name to db subject name
    Subject.findOne(query, callback);
};

// gets user by the email
module.exports.getSubjectByGrade = function(grade, callback) {
    const query = {grade: grade}; // query to equate name to db subject name
    Subject.findOne(query, callback);
};

//gets subject name by grade
module.exports.getSubjectNameByGrade = function(grade, callback) {
    const query = {grade: grade}; // query to equate name to db subject name
    Subject.find(query, callback);
}

// gets user by username
module.exports.getUserByInstructorId = function(instructor, callback) {
    const query = {instructor: instructor}; // query to equate instructor id's

    // finds user in db
    Subject.findOne(query, callback);
};

// creates subject
module.exports.addSubject = function(newSubject, callback) {
    newSubject.save(callback); // saves to the db
};

// pushes topic to subject
module.exports.createTopic = function(newSubject, newTopic, callback) {
    newSubject.topics.create(newTopic); // saves to the db
};

// pushes topic to subject
module.exports.addTopic = function(subject, newTopic, callback) {
    subject.topics.push(newTopic); // pushes to the topics array;
    subject.save(callback); // saves to the db
};

// pushes topic to subject
module.exports.createSubTopic = function(newSubject, newSubTopic, callback) {
    newSubject.topics.create(newSubTopic); // saves to the db
};

// pushes topic to subject
module.exports.addSubTopic = function(newSubject, newSubTopic, callback) {
    newSubject.topics.sub_topics.push(newSubTopic); // pushes to the topics array;
    newSubject.save(callback); // saves to the db
};

// pushes topic to subject
module.exports.createVideo = function(newSubject, newVideo, callback) {
    newSubject.topics.sub_topics.videos.create(newVideo); // saves to the db
};

// pushes topic to subject
module.exports.addVideo = function(newSubject, newVideo, callback) {
    newSubject.topics.sub_topics.videos.push(newVideo); // pushes to the topics array;
    newSubject.save(callback); // saves to the db
};
