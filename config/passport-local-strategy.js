const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

passport.use(new localStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        User.findOne({email: email}, function(err, user) {
            if(err) {
                console.log('error in finding user ------ Passport');
                return done(err)
            }
            if(user) {
                bcrypt.compare(password,user.password,function(err,result) {
                    if(result != true) {
                        console.log('Invalid Username / Password');
                        return done(null, false);
                    }
                    console.log('Successfully logged in');
                    return done(null, user);
                })
            }else {
                console.log('User does not exist');
                return done(null, false);
            }
        })
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
})

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if(err) {
            console.log("error in finding user ------ Passport");
            return done(err);
        }
        return done(null, user);
    })
});

passport.checkAuthenticated = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/vendor/admin-login');
}

passport.setAuthenticatedUser = function(req, res, next) {
    if(req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;