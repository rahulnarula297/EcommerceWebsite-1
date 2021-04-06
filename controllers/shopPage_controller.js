const Profile=require('../models/profile');
const Category=require('../models/category');

module.exports.shopPage = async function(req, res) {
    try {
        await Profile.find({},(err,allprofiles)=>{     
            if(err){
                console.log(err);
                return res.redirect('back');
            }
            return res.render('shop',{
                profile: allprofiles
            });
        });
    } catch (error) {
       if(error) {
           console.log('error', error);
           return res.redirect('back');
       } 
    }
    
}

module.exports.categoryPage = async function(req, res) {
    const profile_id=req.params.profileId;
    try {
        await Category.findOne({profile_id:profile_id},(err,foundcategory)=>{
            if(err){
                console.log(err);
                return res.redirect('back');
            }
            if(foundcategory) {
                return res.render('categories',{
                    category: foundcategory.category
                });
            }else {
                return res.redirect('back');
            }
        });
    } catch (error) {
        if(error) {
            console.log('error', error);
            return res.redirect('back');
        }
    }
}