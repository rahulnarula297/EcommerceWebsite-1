const Profile = require('../models/profile');
const Order = require('../models/orders');
module.exports.get_profile = async function(req, res) {
    try {
        const profile_id = req.params.profileId;
        await Profile.findOne({_id:profile_id},async (err,foundprofile) => {
            if(err){
                console.log('error', err);
                return res.render('user_view_vendor');
            }
            if(foundprofile){
                await Order.find({"product.profileId":profile_id}, async function(err,foundOrders) {
                    if (err) {
                        console.log('error',err);
                        return res.redirect('back');
                    }
                    res.render('user_view_vendor',{
                        profile: foundprofile,
                        orderCount: foundOrders.length
                    });
                    return;
                })
            } else {
                return res.render('user_view_vendor',{
                    orderCount: 0
                });
            } 
        });
    } catch (error) {
        if(error) {
            console.log('error', error);
            return res.redirect('back');
        }
    }
}