const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const db = require('./config/mongoose');
const port = 8000;

const expressLayouts = require('express-ejs-layouts');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo').default;
const { options } = require('./routes');

const path = require('path');

app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

app.use(express.static('assets'));
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name: 'EcommerceWebsite',
    secret: 'bakeitfresh',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/ecommerce_website_development_db',
        autoRemove: 'disabled'
    },
    function(err) {
        console.log(err||'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is up and running on port: ${port}`)
})