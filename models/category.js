const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    profile_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
    },
    category: [{
        category_name: String,
        products: []
    }]
})

const Category = mongoose.model('category',categorySchema);

module.exports = Category;