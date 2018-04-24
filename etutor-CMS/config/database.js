/**
 * This handles the db connection
 * @database name: etutorCMS
 * @secret: appsecret
 */

module.exports = {
    // the database url

    // database: "mongodb://martin:XfCognXbMQFIAqMP@etutor-shard-00-00-blwdi.mongodb.net:27017,etutor-shard-00-01-blwdi.mongodb.net:27017,etutor-shard-00-02-blwdi.mongodb.net:27017/etutorDB?ssl=true&replicaSet=etutor-shard-0&authSource=admin",
               database: "mongodb://localhost:27017/etutorCMS",

    secret: 'appsecret' // used for token auth
};