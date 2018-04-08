//import { Session } from 'inspector';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const SuperUser = require('../models/superUser');

//Register
router.post('/register', (req, res, next) => {
    let newSuperUser = new SuperUser({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    SuperUser.addSuperUser(newSuperUser, (err, superUser) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
        }
        else {
            res.json({ success: true, msg: 'User registred successfully' });
        }
    });
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    SuperUser.getSuperUserByName(username, (err, superUser) => {
        if (err) throw err;

        if (!superUser) {
            return res.json({ success: false, msg: 'User not found' });
        }

        SuperUser.comparePassword(password, superUser.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(superUser.toJSON(), config.secret, {
                    expiresIn: 604800  // 1 week(604800 sec) before token expires
                });

                // values to be returned to frontend app
                res.json({
                    success: true,
                    token: "bearer " + token,
                    superUser: {
                        id: superUser._id,
                        name: superUser.firstname + ' ' + superUser.lastname,
                        username: superUser.username,
                        email: superUser.email
                    }
                });
            } else {
                // if no match is found
                return res.json({ success: false, msg: 'Wrong password and/or username.' });
            }
        });
    });
});

//Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ superUser: req.superUser });
    console.log(req.superUser);
});

//All users
router.get('/all', (req, res, next) => {
    SuperUser.find((err, superUsers) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(superUsers);
        }
    });
});

//Get User by ID
router.get('/:id', (req, res, next) => {
    SuperUser.findById(req.params.id, (err, post) => {
        if (err) {
            console.log(err);
        } //return next(err);
        else {
            res.json(post);
        }
    });
});

//Add User
router.post('/add', (req, res, next) => {
    SuperUser.create(req.body, (err, post) => {
        if (err) {
            console.log(err);
        } //return next(err);
        else {
            res.json(post);
        }
    });
});

//Update User
router.put('/:id', function (req, res, next) {
    SuperUser.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) {
            console.log(err);
        } //return next(err);
        else {
            res.json(post);
        }
    });
});

//Delete User
router.delete('/:id', function (req, res, next) {
    SuperUser.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) {
            console.log(err);
        } //return next(err);
        else {
            res.json(post);
        }
    });
});


module.exports = router;