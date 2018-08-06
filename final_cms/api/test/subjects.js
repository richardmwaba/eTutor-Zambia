//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let SubjectModel = require('../models/subject');
let subjectData = require('../test_data/subject.json');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Subjects', () => {
    beforeEach((done) => { //Before each test we empty the database
        SubjectModel.remove({}, (err) => {
            done();
        });
    });
    /*
     * Test the /GET route
     */
    describe('/GET subjects', () => {
        it('it should GET all the subjects', (done) => {
            chai.request(app)
                .get('/subjects/all')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST subject', () => {
        it('it should POST a subject', (done) => {
            chai.request(app)
                .post('/subjects/add')
                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNWRlMGZhODBlNDlhMjAzYjQ0ZmU3ZSIsInVzZXJuYW1lIjoiTWFydGluIiwiZW1haWwiOiJjaGlsZXNoZW1hcnRpbkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCQ4YU5RQ2liblFnM09GRWR3N2ZiVEFPYUNuWmRjYmNnOUhWNGM0a0VOaEczZnMuNnZ5NHNIUyIsImlhdCI6MTUzMjg3OTE3MiwiZXhwIjoxNTMzNDgzOTcyfQ.TSiEJJUK_gH-hgEZivdPFAlKeSZ0ak7I_CY_GU9zNRI')
                .send(subjectData)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    // res.body.subject.should.have.property('catergory');
                    // res.body.subject.should.have.property('name');
                    // res.body.subject.should.have.property('thumbnail_video_url');
                    // res.body.subject.should.have.property('grade');
                    // res.body.subject.should.have.property('icon');
                    done();
                });
        });
    });

    // describe('/DELETE/:id subject', () => {
    //     it('it should DELETE a subject given the id', (done) => {

    //         let tmpSubject = new SubjectModel(subjectData); 
    //         tmpSubject.save((err, subject) => {
    //               chai.request(app)
    //               .delete('/subjects/delete/' + subject._id)
    //               .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNWRlMGZhODBlNDlhMjAzYjQ0ZmU3ZSIsInVzZXJuYW1lIjoiTWFydGluIiwiZW1haWwiOiJjaGlsZXNoZW1hcnRpbkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCQ4YU5RQ2liblFnM09GRWR3N2ZiVEFPYUNuWmRjYmNnOUhWNGM0a0VOaEczZnMuNnZ5NHNIUyIsImlhdCI6MTUzMjg3OTE3MiwiZXhwIjoxNTMzNDgzOTcyfQ.TSiEJJUK_gH-hgEZivdPFAlKeSZ0ak7I_CY_GU9zNRI')
    //               .end((err, res) => {
    //                   res.should.have.status(200);
    //                   res.body.should.be.a('object');
    //                 done();
    //               });
    //         });
    //     });

    // });


});