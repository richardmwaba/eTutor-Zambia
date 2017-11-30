// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
// var routes = require('./routes');

// Configuration
mongoose.connect('mongodb://localhost/eTutor');

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Models
var Subject = mongoose.model('Subject', {
    _id                      :   {type: mongoose.Schema.Types.ObjectId},
    name                    :   String,
    grade                   :   {type: mongoose.Schema.Types.ObjectId, ref: 'Grade'},
    instructor              :   {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    subject_description     :   String,
    topics                  :   {
        _id                     :   {type: mongoose.Schema.Types.ObjectId},
        topic_name              :   String,
        sub_topics              :   {
            _id                     :   {type: mongoose.Schema.Types.ObjectId},
            name                    :   String,
            videos                  :   {
                _id                     :   {type: mongoose.Schema.Types.ObjectId},
                url                     :   String
            }
        }
    }
});

// Routes
// app.use('/', routes);
// Get subjects
app.get('/api/subjects', function(req, res) {

    console.log("fetching reviews");

    // use mongoose to get all reviews in the database
    Subject.find(function(err, reviews) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(reviews); // return all reviews in JSON format
    });
});

// create review and send back all reviews after creation
app.post('/api/subjects', function(req, res) {

    console.log("creating review");

    // create a review, information comes from request from Ionic
    Subject.create({
        _id: mongoose.Types.ObjectId(),
        subject_name: req.body.subject_name,
        instructor: mongoose.Types.ObjectId(),
        subject_description: req.body.description,
        grade: mongoose.Types.ObjectId(),
        topics: {
            _id: mongoose.Types.ObjectId(),
            topic_name: req.body.topics.topic_name,
            sub_topics: {
                _id: mongoose.Types.ObjectId(),
                name: req.body.topics.sub_topics.name,
                videos: {
                    _id: mongoose.Types.ObjectId(),
                    url: req.body.topics.sub_topics.videos.url
                },
            },
        },
        done : false
    }, function(err, subject) {
        if (err)
            res.send(err);

        // get and return all the reviews after you create another
        Subject.find(function(err, subjects) {
            if (err)
                res.send(err);
            res.json(subjects);
        });
    });

});

// delete a subject
app.delete('/api/subjects/:_id', function(req, res) {
    Subject.remove({
        _id : req.params._id
    }, function(err, subject) {

    });
});


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");