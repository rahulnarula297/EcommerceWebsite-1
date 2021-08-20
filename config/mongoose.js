const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ecommerce_website_development_db',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
mongoose.set('useFindAndModify',false);


db.on('error', console.error.bind(console,'error connecting to database'));

db.once('open', function() {
    console.log('Successfully connected to database :: MongoDB');
})

module.exports = db;