require('dotenv').config();

module.exports = {
    database: process.env.DB_HOST,
    secret: 'yoursecret'
};
