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
