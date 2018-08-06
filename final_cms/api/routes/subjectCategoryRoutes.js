/** This handles all the categories routes
 */
"use strict";
const express = require('express');
const router = express.Router();
const Category = require('../models/subjectCategory');
const mongoose = require('mongoose');
const verifyToken = require('../routes/auth/verifyToken');

/**
 * get all coupons
 */
router.get('/all', (req, res, next) => {
    Category.getAllCategories((err, Category) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to get Category'});
        } else {
            // if success
            res.json(Category);
        }
    });
});


/**
 * make the schema for the new category
 */
router.post('/add',verifyToken, prepareSchema, saveCategory);


/**
 * prepare the schema for the new category
 * @param req
 * @param res
 * @param next
 */
function  prepareSchema(req, res, next){
    req.category = Category({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name
    });
    next();
}


/**
 * save the new category to the database
 * @param req
 * @param res
 * @param next
 */
function saveCategory(req, res, next){
    Category.addCategory(req.category, (err, category)=>{
        if(err){
            res.json({success:false, msg:"Failed to add new category"});
        }else{
            res.json({success:true, msg:"You added "+category.name});
        }
    })
}

/**
 * delete a category
 */
router.delete('/delete/:categoryId',verifyToken, function(req, res) {
    Category.remove({_id:req.params.categoryId}, (err, category) =>{
        if(err) {
            res.json({success:false, msg:err.message});
        }else {
            res.json({success:true, category:category});
        }

    });
});
module.exports = router;