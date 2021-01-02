const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ecommerce_website_development_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console,'error connecting to database'));

db.once('open', function() {
    console.log('Successfully connected to database :: MongoDB');
})

module.exports = db;