/**
 * This handles all the user's routes
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const mongoose = require('mongoose');                     // mongoose for mongodb

const User = require('../models/user');

// register route (creates new user and store in db)
router.post('/register', (req, res, next) => {
    let newUser = new User.getModel({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        title: req.body.title,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        mySubjects: []
    }); 
    // add to db
    User.addUser(newUser, (err, user) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: err.message});
        } else {
            // if success
            res.json({success: true, msg: 'Welcome '+user.username});
        }
    });
});

// Used on login to authenticate the user
router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;  // or use phone
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, msg: 'These credentials match our records, please sign up.'}); // use new status
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800  // 1 week(604800 sec) before token expires
                });

                // values to be returned to frontend app
                res.json({
                    success: true,
                    token: "JWT "+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        phone: user.phone
                    }
                });
            } else {
                // if no match is found
                return res.json({success: false, msg: 'Wrong password and/or email.'});
            }
        });
    });
});

// protect user profile route
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

// retrieve all users
router.get('/all', (req, res, users) => {
    User.getAllUsers((err, users) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to get users'});
        } else {
            // if success
            res.json(users);
        }
    });
});

// add subject to my subjects subdocument
router.post('/mySubjects/enroll/:Email', (req, res, users) => {
    User.getUserByEmail(req.params.Email, (err, user) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to enroll. Please make sure that you have signed in.'});

        }
        // if success, check if user has not already enrolled for this subject
        let subject = user.mySubjects.id(req.body._id);

        if(!subject) {
            user.mySubjects.push(req.body);
            //save the updated user
            User.addToMySubjects(user, (err,updatedUser)=>{
                if(err){
                    res.json({success: false, msg: "Failed to enroll. Please try again."})
                }else {
                    res.json({success: true,
                        msg: "You added "+req.body.name+" to my subjects",
                        mySubjects: updatedUser.mySubjects});
                }
            });

        }else{
            res.json({success: false, msg: "You have already enrolled for "+req.body.name});
        }
    });
});

// remove subject from my subjects sub document
router.delete('/mySubjects/remove/:subId/:Email', (req, res, users) => {
    User.getUserByEmail(req.params.Email, (err, user) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to remove this subject.'});
        }
        // if success, attempt to remove this subject from my subjects collection
        let subject = user.mySubjects.id(req.params.subId);
        if(subject) {

            User.removeFromMySubjects(user,req.params.subId, (err,updatedUser)=>{
                if(err){
                    res.json({success: false, msg: "Failed to remove "+subject.name});
                }else {
                    res.json({success: true,
                        msg: "You removed "+subject.name+" from my subjects",
                        mySubjects: updatedUser.mySubjects});
                }
            });
        }else{
            res.json({success: false, msg: "Failed to remove this subject."});
        }
    });
});

// retrieve given user and return only the subjects they have enrolled for
router.get('/mySubjects/:email', (req, res, users) => {
    User.getUserByEmail(req.params.email, (err, user) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to find user'});
        } else {
            // if success
            res.json({success:true, mySubjects: user.mySubjects});
        }
    });
});

// check if user has enrolled for this subject
router.get('/mySubjects/isEnrolled/:email/:subjectId', (req, res, users) => {
    User.getUserByEmail(req.params.email, (err, user) => {
        // check for errors
        if (err) {
            res.json({success: false});
        } else {
            // if success
            if(user.mySubjects.id(req.params.subjectId)==null){

                //not enrolled
            res.json({success: false});

            //is enrolled
            }else{
            res.json({success: true});
            }
        }
    });
});

// delete User
router.delete('/delete/:id', function (req, res, next) {
    User.remove(req.params.id, function (err, post) {
        if (err) {
            console.log(err);
        } //return next(err);
        else {
            res.json(post);
        }
    });
});

module.exports = router;

