/**
 * This handles the db connection
 * @database name: etutorCMS
 * @secret: appsecret
 */

module.exports = {
    // the database url
    // database: encodeURI('mongodb://etutor-shard-00-00-blwdi.mongodb.net:27017,etutor-shard-00-01-blwdi.mongodb.net:27017,etutor-shard-00-02-blwdi.mongodb.net:27017/test?replicaSet=etutor-shard-0" --ssl --authenticationDatabase admin --username martin --password {Tw3ntyS3v3nt33nAtl@$}'),

    // database: 'mongodb://martin:%7BTw3ntyS3v3nt33nAtl%40%7B@'+
    //     'mycluster0-shard-00-00.mongodb.net:27017,'+
    //     'mycluster0-shard-00-01.mongodb.net:27017,'+
    //     'mycluster0-shard-00-02.mongodb.net:27017/admin?ssl=true&replicaSet=Mycluster0-shard-0&authSource=admin',

    // mongo "mongodb://etutor-shard-00-00-blwdi.mongodb.net:27017,etutor-shard-00-01-blwdi.mongodb.net:27017,etutor-shard-00-02-blwdi.mongodb.net:27017/test?replicaSet=etutor-shard-0" --ssl --authenticationDatabase admin --username martin --password {Tw3ntyS3v3nt33nAtl@$}"
    // options: {
    //     ssl: true,
    //     authSource: 'admin',
    //     replicaSet: 'Mycluster0-shard-0'
    // };

    database: "mongodb://martin:XfCognXbMQFIAqMP@etutor-shard-00-00-blwdi.mongodb.net:27017,etutor-shard-00-01-blwdi.mongodb.net:27017,etutor-shard-00-02-blwdi.mongodb.net:27017/test?ssl=true&replicaSet=etutor-shard-0&authSource=admin",
               mongodb://martin:XfCognXbMQFIAqMP@etutor-shard-00-00-blwdi.mongodb.net:27017,etutor-shard-00-01-blwdi.mongodb.net:27017,etutor-shard-00-02-blwdi.mongodb.net:27017/test?ssl=true&replicaSet=etutor-shard-0&authSource=admin

    secret: 'appsecret' // used for token auth
}