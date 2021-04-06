const Profile=require('../models/profile');

module.exports.home = async function(req, res) {
    try {
        Profile.find({},(err,allProfiles) => {
            if(err){
                console.log(err);
                return res.render('home');
            }
            if(allProfiles) {
                res.render('home',{
                    profiles: allProfiles
                });
                return;
            }
            return res.render('home');
        });
    } catch (error) {
        if(error) {
            console.log('error', error);
            return;
        }
    }
}
