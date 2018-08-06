let jwt = require('jsonwebtoken');
const config = require('../../config/database');

function verifyToken(req, res, next){
   let token = req.get('Authorization');
    if (!token)
        return res.status(403).send({ auth: false, msg: 'No token provided.' });
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, msg: 'Failed to authenticate token.' });
        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;