const nodemailer = require('../config/nodemailer');

//function that will send that mail
//we are using another way of exporting a method
exports.signup = (vendor_details) => {
    // console.log('inside newProfile mailer', profile);
    console.log(vendor_details);

    nodemailer.transporter.sendMail({
        from: process.env.nodemailer_mail,
        to: vendor_details.email,
        subject: "SIGN IN INFO",
        html: `<div><b>Welcome on board, This is your email id and password for logging in your admin account. Thanks</b></div>
               <div><b>Username :</b> ${vendor_details.name} </div><br>
               <div><b>Vendor Email :</b> ${vendor_details.email}</div><br>
               <div><b>Vendor Password :</b> ${vendor_details.password}</div>`
    }, (err, info) => { //info carries the information about the request that has been sent
        if(err) {
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message Sent', info);
        return;
    });
}