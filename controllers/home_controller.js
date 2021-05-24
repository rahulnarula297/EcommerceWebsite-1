const Profile = require('../models/profile');
const Product = require('../models/product');
const Review = require('../models/review');
const moment = require('moment');

module.exports.home = async function(req, res) {
    try {
        Profile.find({},async (err,allProfiles) => {
            if(err){
                console.log('error', err);
                return res.render('home');
            }
            if(allProfiles) {
                var products = await Product.find({},(err) => {
                    if(err) {
                        console.log('error', err);
                        return res.render('home',{
                            profiles: allProfiles
                        });
                    }
                })
                .sort({likes: 'desc'})
                .limit(15)

                var reviews = await Review.find({},(err)=>{
                    if(err) {
                        console.log('error',err);
                        return res.render('home',{
                            profiles: allProfiles,
                            bestProducts: products
                        });      
                    }
                })
                .sort({rating:'desc'})
                .limit(15)

                return res.render('home',{
                    profiles: allProfiles,
                    bestProducts: products,
                    reviews: reviews,
                    moment: moment
                });
            }
        });

    } catch (error) {
        if(error) {
            console.log('error', error);
            return res.render('home');
        }
    }
}

module.exports.autocomplete = async function(req, res) {
    var regex = new RegExp(req.query["term"],'i');
    var products = Product.find({$or:[{name: regex},{description: regex}]},{'name':1,'description':2}).sort({"updatedAt": -1}).sort({"createdAt": -1});
    await products.exec(function(err, foundproducts) {
        if(err) {
            console.log('error', err);
            return res.redirect('back');
        }
        var result = []
        if(foundproducts && foundproducts.length && foundproducts.length > 0) {
            foundproducts.forEach(product => {
                let obj = {
                    _id: product._id,
                    label: product.name
                };
                result.push(obj);
            });
        }
        res.json(result);
    })
}

module.exports.search = async function(req,res) {
    var regex = new RegExp(req.body.search,'i');
    var products = Product.find({$or:[{name: regex},{description: regex}]}).sort({"updatedAt": -1}).sort({"createdAt": -1});
    console.log(products);
    await products.exec(function(err, foundproducts) {
        if(err) {
            console.log('error', err);
            return res.redirect('back');
        }
        console.log(foundproducts);
        return res.render('products',{
            products: foundproducts
        })
    })

}