const contactMailer = require('../mailers/contact.js');

module.exports.contactPage = async function(req, res) {
    return res.render('contact');
}

module.exports.contactUs = async function(req, res) {
    try {
        let contactDetails = req.body;
        contactMailer.contactUs(contactDetails);
        req.flash('success','Thanks for contacting us, we will soon get back to you!!!');
        return res.redirect('back');
    } catch (error) {
        if(error) {
            console.log('error:', error);
            return res.redirect('back');
        }
    }
}