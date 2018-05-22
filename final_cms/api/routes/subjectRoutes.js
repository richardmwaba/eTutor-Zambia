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
    Subject.getSubjectByGrade(req.params.grade, (err, subjects) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to get subject'});
        } else {
            // if success
            res.json(subjects);
        }
    });
});

//get names of subjects by grade
router.get('/grade/find/name/:grade', (req, res, next) => {
    Subject.getSubjectNameByGrade(req.params.grade, (err, subjects) => {
        if (err) {
            res.json({success: false, msg: 'Failed to get subject'});
            console.log(err);
        } else {
            // if success
            // let sub = {
            //     id: subject._id,
            //     subName: subject.name
            // }
            res.json(subjects);
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
        name: req.body.subjectName,
        description: req.body.subjectDescription,
        grade: req.body.subjectGrade,
        category: req.body.subjectCategory,
        icon: req.body.icon,
        instructors: [],
        topics: []
    });
// add to db
Subject.addSubject(newSubject, (err, subject) => {
    // check for errors
    if (err) {
        //res.json({ success: false, msg: 'Failed to add subject' });
        res.json({success: false, msg: err.stack});
        console.log(err)
    } else {
        // if success
        res.json({subject, success: true, msg: 'You have successfully added a new subject'});
}
});
});

// Used to update subject fields
router.post('/add/topic/:subId', (req, res, next) =>{
    let newTopic = new Topic.getModel({
        _id: mongoose.Types.ObjectId(),
        topic_name: req.body.topicName,
        duration: req.body.topicDuration,
        description: req.body.TopicDescription,
        sub_topics:
            {
                _id: mongoose.Types.ObjectId(),
                name: req.body.sub_topicsName,
                videos:
                    {
                        _id: mongoose.Types.ObjectId(),
                        name: req.body.videosName,
                        url: req.body.videosUrl
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
                name: req.body.subTopicName,
                videos:
                    {
                        _id: mongoose.Types.ObjectId(),
                        name: req.body.videosName,
                        url: req.body.videosUrl
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
        name: req.body.newVideoName,
        url: req.body.newVideoUrl
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

