/**
 * This handles all the user's routes
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');

// register route (creates new user and store in db)
router.post('/register', (req, res, next) => {
    let newUser = new User.getModel({
        f_name: req.body.f_name,
        l_name: req.body.l_name,
        title: req.body.title,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
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
            return res.json({success: false, msg: 'User does not exist'}); // use new status 
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

module.exports = router;

