/**
 * This handles the db connection
 * @database name: etutorCMS
 * @secret: appsecret
 */

module.exports = {
    // the database url
    database: 'mongodb://localhost:27017/etutorCMS', 
    secret: 'appsecret' // used for token auth
}