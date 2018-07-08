'use strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs'),
  User = mongoose.model('User'),
  path = require('path'),
  async = require('async'),
  crypto = require('crypto'),
  _ = require('lodash'),
  hbs = require('nodemailer-express-handlebars'),
  email = process.env.MAILER_EMAIL_ID || 'auth_email_address@gmail.com',
  pass = process.env.MAILER_PASSWORD || 'auth_email_pass',
  nodemailer = require('nodemailer'),
  creds = require('../config/mail');


var smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
  auth: {
    user: creds.user,
    pass: creds.pass
  }
});

var handlebarsOptions = {
  viewEngine: 'handlebars',
  viewPath: path.resolve('./email-templates/'),
  extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));

module.exports.renderForgotPasswordPage = function(req, res) {
  return res.sendFile(path.join(__dirname, '../public/forgot-password.html'));
};

module.exports.renderResetPasswordPage = function(req, res) {
  return res.sendFile(path.join(__dirname, '../public/reset-password.html'));
};

module.exports.forgotPassword = function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({
        email: req.body.email
      }).exec(function(err, user) {
        if (user) {
          done(err, user);
        } else {
          done('User not found.');
        }
      });
    },
    function(user, done) {
      // create the random token
      crypto.randomBytes(20, function(err, buffer) {
        var token = buffer.toString('hex');
        done(err, user, token);
      });
    },
    function(user, token, done) {
      User.findByIdAndUpdate({ _id: user._id }, { reset_password_token: token, reset_password_expires: Date.now() + 86400000 }, { upsert: true, new: true }).exec(function(err, new_user) {
        done(err, token, new_user);
      });
    },
    function(token, user, done) {
      var data = {
        to: user.email,
        from: creds.user,
        template: 'forgot-password',
        subject: 'Forgot Password Email',
        context: {
          url: 'http://localhost:5000/users/reset-password?token=' + token,
          name: user.name.split(' ')[0]
        }
      };
      smtpTransport.sendMail(data, function(err) {
        if (!err) {
          return res.json({ message: 'Kindly check your email for further instructions' });
        } else {
          return done(err.stack);
        }
      });
    }
  ], function(err) {
    return res.json({ message: err });
  });
};

/**
 * Reset password
 */
module.exports.resetPassword = function(req, res, next) {
  User.findOne({
    reset_password_token: req.body.token,
    reset_password_expires: {
      $gt: Date.now()
    }
  }).exec(function(err, user) {
    if (!err && user) {
      console.log(req.body.token);
      if (req.body.newPassword === req.body.verifyPassword) {
        user.password = bcrypt.hashSync(req.body.newPassword, 10);
        user.reset_password_token = undefined;
        user.reset_password_expires = undefined;
        user.save(function(err) {
          if (err) {
            return res.status(422).send({
              message: err
            });
          } else {
            var data = {
              to: user.email,
              from: creds.user,
              template: 'reset-password',
              subject: 'Password Reset Confirmation',
              context: {
                name: user.name.split(' ')[0]
              }
            };
            
            smtpTransport.sendMail(data, function(err) {
              if (!err) {
                return res.json({ message: 'Password reset' });
              } else {
                return done(err);
              }
            });
          }
        });
      } else {
        return res.status(422).send({
          message: 'Passwords do not match'
        });
      }
    } else {
      return res.status(400).send({
        message: 'Password reset token is invalid or has expired.'
      });
    }
  });
};