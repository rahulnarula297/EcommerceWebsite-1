const contactMailer = require('../mailers/contact.js');

module.exports.contactPage = async function(req, res) {
    return res.render('contact');
}

module.exports.contactUs = async function(req, res) {
    let contactDetails = req.body;
    contactMailer.contactUs(contactDetails);
    return res.redirect('back');
}