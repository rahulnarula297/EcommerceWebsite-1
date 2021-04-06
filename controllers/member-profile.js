const Profile=require('../models/profile');

module.exports.get_profile = async function(req, res) {
    try {
        const profile_id=req.params.profileId;
        Profile.findOne({_id:profile_id},(err,foundprofile) => {
            if(err){
                console.log('error', err);
                return res.render('user_view_vendor');
            }
            if(foundprofile){
                res.render('user_view_vendor',{
                    profile: foundprofile
                });
                return;
            }
            return res.render('user_view_vendor');
        });
    } catch (error) {
        if(error) {
            console.log('error', error);
            return res.redirect('back');
        }
    }
}