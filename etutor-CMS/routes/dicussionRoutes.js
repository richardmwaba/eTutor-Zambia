/** This handles all the discussion routes
 */
"use strict";
const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');                     // mongoose for mongodb

const Discussion = require('../models/discussion');
const Like = require('../models/like');
const Dislike = require('../models/dislike');

router.get('/all', (req, res, next) => {
// find a discussion with given topic id
    Discussion.getAllDiscussions((err, discussions) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'An error occurred.'});
        } else {

                res.json(discussions);
            }
    });
});

/**
 * finds requested discussions
 */
router.get('/find/:topic_id', (req, res, next) => {
// find a discussion with given topic id
    Discussion.findMatch(req.params.topic_id, (err, discussion) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'An error occurred.'});
        } else {
            // if success
            if(discussion) {
                res.json({comments:discussion.comments, success:true, msg:'Found'});
            }else{
                res.json({success: false, msg: 'There are currently no discussions for this topic.'});
            }
        }
    });
});

router.get('/find/:topic_id/:username', (req, res, next) => {
// find a match
    let hasLiked=false;
    let hasDisliked=false;

    Discussion.findMatch(req.params.topic_id, (err, discussion) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'An error occurred.'});
        } else {
            // on success, check if this user has already liked or disliked
            if(discussion) {
                Like.findMatch(req.params.username, (err, like) => {if(like){hasLiked=true;}});
                Dislike.findMatch(req.params.username, (err, dislike) => {if(dislike){hasDisliked=true;}});

                res.json({success:true,
                    msg:'Found',
                     hasLiked:hasLiked,
                    hasDisliked: hasDisliked,
                    comments:discussion.comments});

            }else{
                res.json({success: false, msg: 'There are currently no discussions for this topic.'});
            }
        }//end if
    });
});

/**
 * adds new discussion
 */
router.post('/add', (req, res, next) => {
// set fields
    let newDicussion = Discussion.getModel({
        _id: mongoose.Types.ObjectId(),
        topic_id: req.body.topic_id,
        comments: [{
            _id: mongoose.Types.ObjectId(),
            username: req.body.username,
            title: req.body.title,
            message: req.body.message,
            likes: 0,
            likedBy:[],
            dislikes: 0,
            dislikedBy:[]
        }]
    });


    //save to db
    Discussion.addDiscussion(newDicussion, (err, discussion) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to save you comment.'});
        } else {
            // if success
            res.json({success:true,
                comment:discussion.comments,
                msg: 'Your comment has been saved.'});
        }
    });
});

//update reactions ie like or dislikes on comments
router.patch('/reaction/update', (req, res, next) => {
// find the discussion
    Discussion.findMatch(req.body.discussion_id, (err, discussion)=>{
        if(err){
            res.json({success: false, msg: 'This discussion does not exist'});
        }else{
            //if found, update the reactions or create a new one
            if(req.body.reaction_id!=null){
                Reaction.findMatch(req.body.reaction_id, (err, reaction)=>{
                    if (err){
                        res.json({success: false, msg:"Could not save your reaction"})
                    } else{
                        reaction.likes = req.body.likes;
                        reaction.dislikes = req.body.dislikes;
                        res.json({success:true, msg:"You reacted to this comment"});
                    }
                })
            }else{
                // create new reaction
                let newReaction = Reaction.getModel({
                    _id: mongoose.Types.ObjectId(),
                    username: req.body.username,
                    user_email: req.body.user_email,
                    likes: req.body.likes,
                    dislikes: req.body.dislikes
                });
                Reaction.addReaction(newReaction, (err, reaction)=>{
                    if(err){
                        res.json({success:false, msg:"Could not save your reaction"});
                    }else{
                        res.json({success:true, msg:"You reacted to this comment"});
                    }
                })
            }

        }
    });
});


// delete a Coupon
router.delete('/delete/:Id', function(req, res) {
    Discussion.remove(req.params.Id, (err, discussions) =>{
        if(err) {
            res.json(err.message);
        }else {
            res.json(discussions);
        }

    });
});

module.exports = router;