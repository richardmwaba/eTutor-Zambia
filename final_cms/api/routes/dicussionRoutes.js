/** This handles all the discussion routes
 */
"use strict";
const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');
const Comment = require('../models/comment');// mongoose for mongodb
const Discussion = require('../models/discussion');
const Reviewer = require('../models/reviewers');
const passport = require('passport');


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
 * finds requested discussion
 */
router.get('/find/:topic_id/:user_id*?',findDiscussion);

function findDiscussion(req, res, next){
    Discussion.findMatch(req.params.topic_id, (err, discussion) => {
        // check for errors
        if (err) {
            res.json({success: null, msg: 'An error occurred.'});
        } else {
            // if success
            if (discussion) {
                res.json({
                    comments: discussion.comments,
                    topic_id: discussion.topic_id,
                    success: true,
                    msg: 'Found'
                });
            } else {
                res.json({success: null, msg: 'There are currently no discussions for this topic.'});
            }
        }
    });
}

function findReviewer(req, res, next){

}

/**
 * adds new discussion or comment
 */
router.post('/add/', checkWhatToUpdate);


/**
 * determines weather to create a new discussion or get an existing one and add a comment to it
 * @param req
 * @param res
 * @param next
 */
function checkWhatToUpdate(req, res, next){
    if (req.body.hasDiscussion) {
        addNewComment(req, res, next);
    }else {
        addNewDiscussion(req, res, next);
    }
}

/**
 * adds a new comment to the selected discussion
 * @param req
 * @param res
 * @param next
 */
function addNewComment(req, res, next){
    console.log(req.get('Authorization'));
    Discussion.findMatch(req.body.topic_id, (err, discussion) => {
        if (err) {
            res.json('An error occurred. This discussion may have been closed.');
        } else {
            let newComment = Comment.getModel({
                _id: mongoose.Types.ObjectId(),
                username: req.body.username,
                title: req.body.title,
                message: req.body.message,
                likes: 0,
                dislikes: 0,
                reviewers: {
                    _id: req.body.user_id,
                    hasLiked: false,
                    hasDisliked: false
                },
            });

            Discussion.addComment(discussion, newComment, (err, updatedDiscussion) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'An error occurred while adding your comment to this discussion'
                    });
                } else {
                    // if success
                    res.json({
                        success: true,
                        comments: updatedDiscussion.comments,
                        topic_id: updatedDiscussion.topic_id,
                        msg: 'Your comment has been saved!'
                    });
                }
            });
        }
    })
}


/**
 * creates a new discussion
 * @param req
 * @param res
 * @param next
 */
function addNewDiscussion(req, res, next){

    let newDiscussion = Discussion({
        _id: mongoose.Types.ObjectId(),
        topic_id: req.body.topic_id,
        comments: []
    });
    //save to db
    Discussion.addDiscussion(newDiscussion, (err, discussion) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: err.stack});
        } else {
            // if success
            addNewComment(req, res, next);
        }
    });
}

//update reactions like or dislikes on comments
router.patch('/updateReactions/:topic_id/:comment_id/:hasLiked/:hasDisliked/:user_id/:likes/:dislikes/:didReact*?', updateReactions);

//the function to perform the actual attribute updates
function updateReactions(req, res, next){
    let reviewer;
    let comment;
    // find the discussion
    Discussion.findMatch(req.params.topic_id, (err, discussion) => {
        if (err) {
            res.json({success: null, msg: 'This discussion does not exist'});
        } else {
            //if found, update the reactions or create a new one
            comment = discussion.comments.id(req.params.comment_id);
            reviewer = comment.reviewers.id(req.params.user_id);
            //check if this user has reacted earlier else create a new entry
            if(reviewer){
                // reviewer = comment.reviewers.id(req.params.user_id);
                 comment.reviewers.pull(req.params.user_id);
            }else {
                reviewer = Reviewer.getModel({
                    _id: req.params.user_id,
                        hasLiked: false,
                        hasDisliked: false
                });
            }
            reviewer.hasLiked = req.params.hasLiked;
            reviewer.hasDisliked = req.params.hasDisliked;
            comment.reviewers.push(reviewer);
            discussion.comments.id(req.params.comment_id).likes = req.params.likes;
            discussion.comments.id(req.params.comment_id).dislikes = req.params.dislikes;
            discussion.save();
            res.json({
                success: true,
                msg: 'Your reaction was saved!',
                comments: discussion.comments
            });
        }
    });
}

// delete a discussion
router.delete('/comments/delete/:topic_id/:comment_id', (req, res)=> {
    Discussion.findMatch(req.params.topic_id, (err, discussion) => {
        if (err) {
            res.json({success: null, msg: 'An error occurred'});
        } else if(discussion) {
            let cmnt = discussion.comments.id(req.params.comment_id).remove();
            discussion.save(function(err){
                if(err) {
                    res.json({success: null, msg: 'An error occurred'});
                }else {
                    res.json({success: true, msg: 'You comment has been deleted', comments:discussion.comments});
                }
            });
        }else {
            res.json({success: false, msg: 'You comment could not be deleted'});
        }
    });
});

// delete a discussion
router.delete('/delete/:Id', (req, res)=> {
    Discussion.remove(req.params.Id, (err, discussions) => {
        if (err) {
            res.json(err.message);
        } else {
            res.json(discussions);
        }

    });
});

module.exports = router;