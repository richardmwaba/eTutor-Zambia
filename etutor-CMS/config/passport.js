const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // console.log(jwt_payload);  // for debug purposes
        User.getUserById(jwt_payload._id, (err, User) => {
            if(err) {
                return done(err, false);
            }
            if(User) {
                return done(null, User);
            } else {
                return  done(null, false);
            }
        });
    }));
}