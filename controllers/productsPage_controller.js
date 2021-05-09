const { json } = require('express');
const Category=require('../models/category');
const Product=require('../models/product')


module.exports.productPage = async function(req, res) {
    try {
        const category_Id = req.params.productsId;
        await Category.find({},async (err,profile_categories) => {
            if(err){
                console.log('error', err);
                return res.redirect('back');
            }
            const display_products = [];
            for(categories of profile_categories) {
                for(category of categories.category) {
                    if(category._id == category_Id) {
                        for(var i = 0 ; i < category.products.length ; i++) {
                            await Product.findById({_id: category.products[i]},(err,product) => {
                                if(err) {
                                    console.log('error', err);
                                    return;
                                }
                                display_products.push(product);
                            })
                        }
                    }
                }
            }
            return res.render('products',{
                products: display_products
            });
        });
    } catch (error) {
        if(error) {
            console.log('error', error);
            return res.redirect('back');
        }
    }    
}

module.exports.likeController = async function(req, res) {
    let productId = req.params.productId;
    console.log(productId);
    if(req.xhr) {
        var count = req.body.info;
        Product.findByIdAndUpdate(productId,{likes: count},{new: true}, (err, updatedProduct) => {
            if(err) {
                console.log('error', err);
                return;
            }
            console.log(updatedProduct);
        })
    }
} 