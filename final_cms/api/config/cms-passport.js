// Passport configurations used for authenticating cms routes
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const SuperUser = require('../models/superUser');
const config = require('../config/database');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('bearer');
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload);
        SuperUser.getSuperUserById(jwt_payload._id, (err, superUser) => {
            if(err){
                return done(err, false);
            }
            
            if(superUser){
                console.log('Managed');
                return done(null, superUser);
            } else {
                return done(null, false);
            }
        });
    }));
}