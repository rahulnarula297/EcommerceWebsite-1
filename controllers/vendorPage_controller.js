const User = require('../models/user');
const bcrypt = require('bcrypt');
const Profile = require('../models/profile');
const Category = require('../models/category');
const Product = require('../models/product');
const profileMailer = require('../mailers/vendor.js');
const signupMailer = require('../mailers/signup.js');
const url = require('url');
const { response } = require('express');
const { profile } = require('console');

module.exports.vendorPage = async function(req, res) {
    try {
        await Profile.findOne({user_id: req.user.id},  async function(err, profile) {
            if(err) {
                console.log('error', err);
                return res.redirect('back');
            }
            if(profile) {
                await Product.find({profile:profile._id},(err,allProducts)=>{
                    if(err) {
                        console.log('error', err);
                        return res.redirect('back');
                    }
                    return res.render('vendor', {
                        profile: profile,
                        products: allProducts,
                        productsExist: true,
                        profileExist: true,
                        display: 'initial',
                        called: 'profile',
                        product_display: 'none'
                    });     
                });     
            }else {
                res.render('vendor', {
                    profileExist: false,
                    productsExist: false,
                    display: 'none',
                    called: 'profile',
                    product_display: 'none'
                });
            }
        })
    } catch (error) {
        if(error) {
            console.log('error', error);
            return res.redirect('back');
        }
    }
}

module.exports.create = async function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        console.log('passwords do not match --- create User');
        console.log(req.body);
        req.flash('error','Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            console.log('Error', err);
            return;
        }

        if(!user) {
            try {
                
                signupMailer.signup(req.body);

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
                            req.flash('success', 'You have signed up, login to continue!');
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
            req.flash('error', 'This email already exists!!!');
            
            return res.redirect('back');
        }
    })
}

module.exports.createSession = async function(req, res) {
    req.flash('success','Successfully Logged In !!!');
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
    req.flash('success','Successfully Logged Out')
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
                    experience: req.body.experience,
                    user_id: req.user._id,
                    email: req.user.email
                },function(err, profile) {
                    if(err) {
                        console.log('error --------> ', err);
                        req.flash('error', 'Profile setup unsuccessful');
                        return res.redirect('back');
                    }
                    
                    console.log('Profile setup successful');

                    profileMailer.newProfile(profile);
                    
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

module.exports.updateProfile = async function(req, res) {
    if(req.xhr) {
        const profileId = req.params.id;
        var info = JSON.parse(req.body.info);
        var value = info.value;
        var prop = info.prop;
        var obj = {};
        obj[prop] = value;
        await Profile.findByIdAndUpdate(profileId, {$set:obj},{new: true}, async function(err, profile) {
            if (err) {
                console.log('error', err);
                return res.redirect('back');
            }
            else {
                console.log("Updated Profile : ", profile);
                return res.status(200).json({
                    message: "Product Updated"
                })
            }
        });
    }
}

module.exports.vendorProducts = async function(req, res) {
    await Profile.findOne({user_id: req.user.id},  async function(err, profile) {
        if(err) {
            console.log('error', err);
            return res.redirect('back');
        }
        await Product.find({profile:profile._id},(err,allProducts)=>{
            if(err) {
                console.log('error', err);
                return res.redirect('back');
            }
            res.render('vendor', {
                profile: profile,
                profileExist: true,
                called: 'product',
                product_display: 'initial',
                products: allProducts,
                productsExist: true,
            })
        });
    });
}

module.exports.addtem = async function(req, res) {
    res.render('vendor_addItem',{
        update: false
    });
}

module.exports.addingItem = async function(req,res){
    try{
        Profile.findOne({user_id : req.user._id},(err,profile)=>{
            if(err) {
                console.log('error: ',err);
                return res.redirect('back');
            }

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
                    weight: req.body.weight,
                    description: req.body.description,
                    category: req.body.category,
                    variants:req. body.variants,
                    price_per_kg: req.body.price_per_kg,
                    customizable: req.body.customizable,
                    units: req.body.units,
                    expiry: req.body.expiry,
                    delivery_time: req.body.delivery,
                    eggless: req.body.eggless,
                    serving_size: req.body.serving_size,
                    likes: 0,
                    profile: profile._id,
                    bakeryname: profile.bakeryname
                },(err,product)=>{
                    if(err){
                        console.log('error:', err);
                        req.flash('error','Please Enter All The Values')
                        return res.redirect('back');
                    }
                    Category.findOne({profile_id: profile._id},(err, found_category)=>{
                        if(err) {
                            console.log('error:', err);
                            return res.redirect('back');
                        }
                        if(found_category) {
                            var categories;
                            var category_added = false;
                            for(categories of found_category.category) {
                                if(categories.category_name == req.body.category) {
                                    categories.products.push(product._id);
                                    category_added = true;
                                }
                            }
                            if(category_added == false) {
                                found_category.category.push({
                                    category_name: req.body.category,
                                    products: [product._id]
                                });
                            }
                            found_category.save();
                        }else {
                            Category.create({
                                profile_id: profile._id,
                                category: [{
                                    category_name: req.body.category,
                                    products: [product._id]
                                }]
                            },(err, category) => {
                                if(err){
                                    console.log('error:', err);
                                    return res.redirect('back');
                                }
                                console.log('Category Added Successfuly');
                                console.log(category);
                            })
                        }
                    })
                    console.log('product added successfully');
                    console.log(product);
                    req.flash('success','Product Added Successfully');
                    return res.redirect ('/vendor/product');
                });
            })
        });
    }catch(error){
        console.log('error', error);
        return res.redirect('back');
    }
}

module.exports.removeProduct = async function(req, res) {
    const product_id = req.params.id;
    const profile = req.params.profile;
    const category_name = req.params.category;

    await Category.findOne({profile_id:profile},(err,category)=>{
        if(err){
            console.log(err);
            return res.redirect('back');
        }

        for(let x = 0; x < category.category.length; x++) {
            var product_category = category.category[x];
            if(product_category.category_name==category_name){
                for(let i=0; i< product_category.products.length; i++) {
                    if(product_category.products[i]==product_id){
                        product_category.products.splice(i,1);
                    }
                }
                if(product_category.products.length == 0) {
                    category.category.splice(x,1);
                }
            }
        }
        category.save();
    });

    await Product.deleteOne({_id:product_id},(err)=>{
        if(err){
            console.log(err);
            req.flash('error','Product Deletion Unsuccessful');
            return res.redirect('back');
        }
        console.log("Product Successfully Deleted",product_id);
    }); 

    if(req.xhr) {
        return res.status(200).json({
            data: {
                productId: product_id
            },
            message: "Product Deleted"
        })
    }
}

module.exports.updateItem = async function(req, res) {
    const productId = req.params.id;
    await Product.findById(productId,(err,product) => {
        if(err){
            console.log('error', err);
            return res.redirect('back');
        }
        return res.render('vendor_addItem',{
            product: product,
            update: true
        });
    });
}

module.exports.updatingItem = async function(req, res) {
    let product_id=req.params.id;
    await Product.findByIdAndUpdate(product_id, req.body, {new: true}, (err,updatedProduct)=>{
        if(err) {
            console.log('error', err);
            req.flash('error','Product Updation Unsuccessful');
            return res.redirect('back');
        }
        console.log("Product Updated Successfully", updatedProduct);
        req.flash('success','Product Updated Successfully');
        return res.redirect('/vendor/product');
    });
}

