const express = require('express');

const db = require('./config/mongoose');

const app = express();

const port = 8000;

app.use(express.urlencoded({extended: false}));

const expressLayouts = require('express-ejs-layouts');

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static('assets'));

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/', require('./routes'));

app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is up and running on port: ${port}`)
})