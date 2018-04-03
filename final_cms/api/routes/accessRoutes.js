/**
* This handles all the access level routes
*/
const express = require('express');
const router = express.Router();
const config = require('../config/database');

const Access_level = require('../models/accessLevels');

router.get('/', (req, res, next) => {
    Access_level.getAccessLevels((err, records) => {
        if(err) {
            res.send(err);
        } else {
            res.json(records);  // returns all the records
        }
    })
})

// gets access level by it's documnet id
router.get('/:id', (req, res, next) => {
    Access_level.getAccessById(req.params.id, (err, access) => {
        if(err) {
            res.json({success: false, msg: 'Cant be found'});
        } else {
            res.json({success: true, Access: access});
        }
    });
});

// gets an access level via its integer representation
router.get('/get-access/:accessId', (req, res, next) => {
    const access_id = req.params.accessId;  // the access level integer value

    Access_level.getAccessByRep(access_id, (err, access) => {
        if(err) next(err);

        res.json(access);  // returns an access level
    });
});

// creates an access level and adds it to the db
router.post('/add-access', (req, res, next) => {
    const data = req.body;

    Access_level.addAccessLevel = (data, (err, access) => {
        if (err) {
            res.json({success: false, msg: 'Error occurred!'});
        } else {
            res.json({success: true, msg: 'Successfully added.'})
        }
    });
});

// updates a particular access level
router.put('/update-access/:id', (req, res, next) => {
    const id = req.params.id;
    const data = req.body;

    Access_level.updateAccessLevel(id, data, (err, access) => {
        if(err) {
            res.json({success: false, msg: 'Didnt manage to update'});
        } else {
            res.json({success: true, Access: access});
        }
    });
});

// permanatly deletes an access level
router.delete('/remove-access/:id', (req, res, next) => {
    const id = req.params.id;

    Access_level.removeAccess(id, (err, access) => {
        if(err) {
            res.json({success: false, msg: 'Could not delete'});
        } else {
            res.json({success: true, msg: 'Deleted successfully'});
        }
    });
});
