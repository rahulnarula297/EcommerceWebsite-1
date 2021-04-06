const Product=require('../models/product');

module.exports.single_productPage = async function(req, res) {
    try {
        const productId=req.params.productId;
        Product.findOne({_id:productId},(err,foundproduct) => {
            if(err){
                console.log(err);
                return res.render('back');
            }
            if(foundproduct){
                res.render('single-product',{
                    product: foundproduct
                });
                return;
            }
        });
    } catch (error) {
        if(error) {
            console.log('error', error);
            return res.redirect('back');
        }
    }
}