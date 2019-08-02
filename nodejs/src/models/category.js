const mongoose = require('mongoose');

const cateSchema = new mongoose.Schema({
    //文章分类名称
    name: {
        type: String,
        required: true
    }
}, {
        timestamps: true
    });

const Category = mongoose.model('Category', cateSchema);

module.exports = Category;