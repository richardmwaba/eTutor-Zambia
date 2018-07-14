/**
 * Holds subject categories
 */
const mongoose = require('mongoose');

// Category schema
const CategorySchema =  mongoose.Schema({
    _id                     :   {type: mongoose.Schema.Types.ObjectId},
    name                    :   String
});

const Category = module.exports = mongoose.model('Category', CategorySchema);
module.exports.getSchema = CategorySchema;

module.exports.addCategory = (category, callback)=>{
    category.save(callback);
};

//get all categories
module.exports.getAllCategories = (callback)=>{
    Category.find({}, callback);
};