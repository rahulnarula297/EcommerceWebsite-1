const nodemailer = require('../config/nodemailer');

//function that will send that mail
//we are using another way of exporting a method
exports.verify = (client_details,OTP) => {
    // console.log('inside newProfile mailer', profile);
    console.log(client_details,OTP);

    nodemailer.transporter.sendMail({
        from: process.env.nodemailer_mail,
        to: client_details.email,
        subject: "SIGN IN INFO",
        html: `<h2>${OTP}</h2><div><b>Welcome on board, This is your email id and password for logging in your admin account. Thanks</b></div>`
    }, (err, info) => { //info carries the information about the request that has been sent
        if(err) {
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message Sent', info);
        return;
    });
}