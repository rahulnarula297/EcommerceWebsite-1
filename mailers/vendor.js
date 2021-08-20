const nodemailer = require('../config/nodemailer');

//function that will send that mail
//we are using another way of exporting a method
exports.newProfile = (profile) => {
    // console.log('inside newProfile mailer', profile);
    let data = nodemailer.renderTemplate({profile: profile}, '/vendor/new_profile.ejs');

    nodemailer.transporter.sendMail({
        from: process.env.nodemailer_mail,
        to: profile.email,
        subject: "New Profile Created",
        html: data
    }, (err, info) => { //info carries the information about the request that has been sent
        if(err) {
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message Sent', info);
        return;
    });
}