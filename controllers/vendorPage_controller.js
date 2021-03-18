const User = require('../models/user');
const bcrypt = require('bcrypt');
const Profile = require('../models/profile');
const Product = require('../models/product');
const { response } = require('express');

module.exports.vendorPage = async function(req, res) {
    Profile.findOne({user_id: req.user.id}, function(err, profile) {
        if(profile) {
            console.log(profile);
            res.render('vendor', {
                profile: profile,
                profileExist: true,
                display: 'initial'
            });
            return;      
        }
        res.render('vendor', {
            profileExist: false,
            display: 'none'
        });
    })
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
            Profile.uploadedAvatar(req, res, function(err) {
                if(err) {
                    console.log('MULTER ERROR ---------------', err);
                }
                Profile.create({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    profileimage: Profile.avatarPath + '/' + req.file.filename,
                    bakeryname: req.body.bakeryname,
                    contact: req.body.contact,
                    instaid: req.body.instaid,
                    fbid: req.body.fbid,
                    areacovered: req.body.areacovered,
                    description: req.body.description,
                    speciality: req.body.speciality,
                    user_id: req.user._id,
                    email: req.user.email
                }, function(err, profile) {
                    if(err) {
                        console.log('error', err);
                        return;
                    }
                    console.log('Profile setup successful');
                    return res.status(200).json({
                        data: {
                            info: profile
                        },
                        message: "Profile Created"
                    })
                })
            }) 
        }
    } catch (error) {
        console.log('error : ',error);
        return res.redirect('back');
    }
}

module.exports.addtem = async function(req, res) {
    res.render('vendor_addItem');
}

module.exports.addingItem = async function(req,res){
    try{
        Profile.findOne({user_id : req.user._id},(err,profile)=>{

            const bakery = profile.bakeryname;

            Product.uploadedProductImage(req, res, function(err) {
                if(err) {
                    console.log('MULTER ERROR ---------------', err);
                }
                console.log(req.file)
                Product.create({
                    productimage: Product.productpath + '/' + req.file.filename,
                    name: req.body.name,
                    flavour: req.body.flavour,
                    price: req.body.price,
                    weight:req.body.weight,
                    description: req.body.description,
                    category:req.body.category,
                    user: req.user._id,
                    bakeryname: bakery
                },(err,product)=>{
                    if(err){
                        console.log('error:', err);
                        return res.redirect('back');
                    }
                    console.log('product added successfully');
                    console.log(product);
                    return res.redirect ('/vendor/profile');
                });
            })
        });
    }catch(error){
        console.log('error', error);
        return res.redirect('back');
    }
}
