/**
 * This handles all the user's routes
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
var mongoose = require('mongoose');                     // mongoose for mongodb

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
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            // if success
            res.json({success: true, msg: 'User registered!'});
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
            return res.json({success: false, msg: 'User does not exist, please sign up.'}); // use new status 
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
            res.json({success: false, msg: 'Failed to enroll. Please make sure that you have signed it.'});

            // if success, check if user has not already enrolled for this subject
        } else if(user.mySubjects.id(req.body._id==null)) {
            user.mySubjects.push(req.body);
            //save the updated user
            User.addToMySubjects(user, (err,updatedUser)=>{
                if(err){
                    res.json({success: false, msg: "Failed to enroll. Please try again."})
                }else {
                    res.json({success: true,
                        msg: "you have successfully enrolled for "+req.body.name,
                        mySubjects: updatedUser.mySubjects});
                }
            });
            
        }else{
            res.json({success: false, msg: "You have already enrolled for this subject!"});
        }
    });
});

// add subject to my subjects subdocument
router.get('/mySubjects/withdraw/:Email/:id', (req, res, users) => {
    User.getUserByEmail(req.params.Email, (err, user) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to get your subjects'});
        } else {
            // if success
            user.mySubjects.id(req.params.id).remove();
            //save the updated user
            User.removeFromMySubjects(user, (err,updatedUser)=>{
                if(err){
                    res.json({success: false, msg: "Failed to save"})
                }else {
                    res.json({success: true, mySubjects: updatedUser.mySubjects});
                }
            })
        }
    });
});

// retrieve given user and return only the subjects they have enrolled for
router.get('/mySubjects/all/:email', (req, res, users) => {
    User.getUserByEmail(req.params.email, (err, user) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to find user'});
        } else {
            // if success
            res.json(user.mySubjects);
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

module.exports = router;

