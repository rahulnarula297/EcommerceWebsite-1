const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.vendorPage = async function(req, res) {
    res.render('vendor');
}

module.exports.create = async function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        console.log('passwords do not match --- create User');
        console.log(req.body);
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            console.log('Error', err);
            return;
        }

        if(!user) {
            try {
                bcrypt.genSalt(10,function(err,salt){  
                    bcrypt.hash(req.body.password,salt,function(err,hash) {
                        if(err) {
                            console.log('error in hashing', err);
                            return;
                        }
                        User.create({
                            email: req.body.email,
                            name: req.body.name,
                            password: hash
                        }, function(err, user) {
                            if(err) {
                                console.log('error', err);
                                return;
                            }
                            console.log('Sign Up successful, login to continue');
                            return res.redirect('/vendor/admin-login');
                        })
                    })
                })       
            } catch (error) {
                console.log('error', error);
                return;
            }
        }else {
            console.log('This email already exists!!!');
            return res.redirect('back');
        }
    })
}

module.exports.createSession = async function(req, res) {
    return res.redirect('/vendor/profile');
}

module.exports.signUp = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/vendor/profile');
    }
    return res.render('signUp');
}

module.exports.signIn = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/vendor/profile');
    }

    return res.render('admin-login');
}

module.exports.signOut = function(req, res) {
    console.log('Successfully logged out');
    req.logout();
    return res.redirect('/vendor/admin-login');
}

module.exports.createProfile = async function(req, res) {
    try {
        
        if(req.xhr) {
            return res.status(200).json({
                data: {
                    info: req.body
                },
                message: "Profile Created"
            })
        }

        return res.redirect('back');

    } catch (error) {
        console.log('error : ',error);
        return res.redirect('back');
    }
}

module.exports.addtem = async function(req, res) {
    res.render('vendor_addItem');
}