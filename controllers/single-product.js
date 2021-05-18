const Product=require('../models/product');
const Review=require('../models/review');
const moment = require('moment');

module.exports.single_productPage = async function(req, res) {
    try {
        const productId=req.params.productId;
        await Product.findOne({_id:productId},async (err,foundproduct) => {
            if(err){
                console.log(err);
                return res.redirect('back');
            }
            if(foundproduct === null) {
                await Product.find({})
                .limit(10)
                .exec((err,foundproducts) => {
                    if(err){
                        console.log('error',err);
                        return res.redirect('back');
                    }
                    return res.render('single-product', {
                        similar_products: foundproducts,
                        productExist: false
                    });
                })
            }
            var profileId = foundproduct.profile;
            await Product.find({profile:profileId})
            .sort({likes: 'desc'})
            .limit(15)
            .where('_id').ne(productId)
            .exec(async (err,products)=>{
                if(err){
                    console.log('error',err);
                    return res.redirect('back');
                }
                await Review.find({product:productId},(err,foundreviews)=>{
                    if(err) {
                        console.log('error',err);
                        res.redirect('back');
                    }
                    if(foundproduct && products && foundreviews){
                        return res.render('single-product',{
                            product: foundproduct,
                            similar_products: products,
                            reviews : foundreviews,
                            productExist: true,
                            moment: moment
                        });
                    }
                });
            });
        });
    } catch (error) {
        if(error) {
            console.log('error', error);
            return res.redirect('back');
        }
    }
}

module.exports.addReview= async function(req,res){
    const productId = req.params.productId;
    await Product.findById({_id:productId},async (err,product) => {
        if(err) {
            console.log('error',err);
            return res.redirect('back');
        }
        const info = JSON.parse(JSON.stringify(req.body));
        var getInitials = function (name) {
            var parts = name.split(' ')
            var initials = ''
            for (var i = 0; i < parts.length; i++) {
                if (parts[i].length > 0 && parts[i] !== '') {
                    initials += parts[i][0]
                }
            }
            return initials
        }
        var name = getInitials(info.name);
        await Review.create({
            name: info.name,
            initials: name,
            content: info.review_content,
            rating: info.rating,
            product: productId,
            profile: product.profile
        },(err,review) => {
            if(err) {
                console.log('error',err);
                return res.redirect('back');
            }
            console.log(review);    
            return res.redirect('back');
        });  
    })
}