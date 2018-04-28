/**
 * This handles all the subject's routes
 */
"use strict";
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
let mongoose = require('mongoose');                     // mongoose for mongodb

const Subject = require('../models/subject');
const Topic = require('../models/topic');
const SubTopic = require('../models/sub_topic');
const Video = require('../models/video');

//get all subjects
router.get('/all', (req, res, next) => {
// add to db
    Subject.getAllSubjects((err, subjects) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to get subject'});
        } else {
            // if success
            res.json(subjects);
        }
    });
});

//get all subjects
router.get('/grade/find/:grade', (req, res, next) => {
// add to db
    Subject.getSubjectByGrade(req.params.grade, (err, subject) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to get subject'});
        } else {
            // if success
            res.json(subject);
        }
    });
});

//get subject
router.get('/find/:id', (req, res, next) => {
// add to db
    Subject.getSubjectById(req.params.id, (err, subject) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to get subject'});
        } else {
            // if success
            res.json(subject);
        }
    });
});

// register route (creates new user and store in db)
router.post('/add', (req, res, next) => {
    let newSubject = new Subject({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        grade: req.body.grade,
        category: req.body.category,
        icon: req.body.icon,
        instructors: [{
            name: req.body.instructors.name,
            title: req.body.instructors.title,
            username: req.body.instructors.username,
            email: req.body.instructors.email,
            password: req.body.instructors.password,
            phone: req.body.instructors.phone,
        }],
        topics: [{
            _id: mongoose.Types.ObjectId(),
            topic_name: req.body.topics.topic_name,
            description: req.body.topics.description,
            duration: req.body.topics.duration,
            sub_topics: [
                {
                _id: mongoose.Types.ObjectId(),
                name: req.body.topics.sub_topics.name,
                videos: [
                    {
                        name:req.body.topics.sub_topics.videos.name,
                    _id: mongoose.Types.ObjectId(),
                    url: req.body.topics.sub_topics.videos.url
                }
                ]
            }
            ]
        }]
    });
// add to db
Subject.addSubject(newSubject, (err, subject) => {
    // check for errors
    if (err) {
        res.json({success: false, msg: err.stack});
    } else {
        // if success
        res.json(subject);
}
});
});

// Used to update subject fields
router.post('/add/topic/:subId', (req, res, next) =>{
    let newTopic = new Topic.getModel({
        _id: mongoose.Types.ObjectId(),
        topic_name: req.body.topic_name,
        duration: req.body.duration,
        description: req.body.description,
        sub_topics:
            {
                _id: mongoose.Types.ObjectId(),
                name: req.body.sub_topics.name,
                videos:
                    {
                        _id: mongoose.Types.ObjectId(),
                        name: req.body.sub_topics.videos.name,
                        url: req.body.sub_topics.videos.url
                    }
            }
    });

    Subject.getSubjectById(req.params.subId, (err, subject) =>{
        // check for errors
        if (err) {
            res.json({ success: false, msg: 'Failed to find this subject' });
        } else {
            // if success
            Subject.addTopic(subject, newTopic, (err, topic) => {
                // check for errors
                if (err) {
                    res.json({ success: false, msg: 'Failed to get subject' });
                } else {
                    res.json(topic);
                }
            });
                // res.json(subject);
        }
    });
});


// Used to add a sub topic to a topic of a subject
router.post('/add/subTopic/:subId/:topicId', (req, res, next) =>{
    let newSubTopic = new SubTopic.getModel({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                videos:
                    {
                        _id: mongoose.Types.ObjectId(),
                        name: req.body.videos.name,
                        url: req.body.videos.url
                    }
    });

    Subject.getSubjectById(req.params.subId, (err, subject) =>{
        // check for errors
        if(err) {
            res.json({success: false, msg: 'Failed to get subject'});
        } else {
            // if success get the topic
            let topic = subject.topics.id(req.params.topicId);

                if (!topic) {
                    res.json({success: false, msg: 'Failed to get the topic'});
                } else {
                    //add the sub topic to the topic found
                    Topic.addSubTopic(subject, topic, newSubTopic, (err, subTopic) => {
                        // check for errors
                        if (err) {
                            res.json({success: false, msg: 'Failed to add the subtopic'});
                        } else {
                            res.json(topic);
                        }
                    });

                }
        }
    });
});

// Used to add a video to a sub topic of a subject
router.post('/add/video/:subId/:topicId/:subTopicId', (req, res, next) =>{
    let newVideo = new Video.getModel({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        url: req.body.url
    });

    Subject.getSubjectById(req.params.subId, (err, subject) =>{
        // check for errors
        if(err) {
            res.json({success: false, msg: 'Failed to get subject'});
        } else {
            // if success get the topic
            let topic = subject.topics.id(req.params.topicId);

            if (!topic) {
                res.json({success: false, msg: 'Failed to get the topic'});
            } else {
                //add the sub topic to the topic found
                let subTopic = topic.sub_topics.id(req.params.subTopicId);
                SubTopic.addVideo(subject, subTopic, newVideo, (err, video) => {
                    // check for errors
                    if (err) {
                        res.json({success: false, msg: 'Failed to add the video'});
                    } else {
                        res.json(topic);
                    }
                });

            }
        }
    });
});

// delete a subject
router.delete('/delete/:subId', function(req, res) {
    Subject.remove({_id : req.params.subId}, (err, subject) =>{
        if(err) {
            res.json(err.message);
        }else {
            res.json(subject);
        }

    });
});

module.exports = router;

