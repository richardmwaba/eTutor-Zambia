// Defines the topics model

const mongoose = require('mongoose');
const config = require('../config/database');
const sub_topic_schema = require('../models/sub_topic');

// topic schema
const TopicSchema = module.exports = mongoose.Schema({
        _id                     :   {type: mongoose.Schema.Types.ObjectId},
        topic_name              :   String,
        description              :   String,
        duration                :   String,
        sub_topics              :   [sub_topic_schema]
});

const model = mongoose.model('Topic', TopicSchema);
module.exports.getModel = model;
// pushes topic to subject
module.exports.addSubTopic = function(subject, topic,newSubTopic, callback) {
    topic.sub_topics.push(newSubTopic); // saves to the db
    subject.save(callback);
};

// pushes topic to subject
module.exports.createTopic = function(newTopic, callback) {
    newTopic.create(newTopic); // pushes to the topics array;
};

// gets subject by the id
// module.exports.getTopicById = function(subject, id, callback) {
//     subject.topics.id(id).done(callback);
// };