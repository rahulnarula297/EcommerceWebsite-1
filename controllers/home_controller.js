const Profile=require('../models/profile');

module.exports.home = async function(req, res) {
    Profile.find({},(err,foundprofile)=>{
        if(err){
            console.log(err);
            return res.render('home');
        }
        if(foundprofile){
            res.render('home',{
                profiles: foundprofile
            });
            return;
        }
        return res.render('home');
    });
}
