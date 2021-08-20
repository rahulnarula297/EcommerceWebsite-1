const nodemailer = require('../config/nodemailer');

//function that will send that mail
//we are using another way of exporting a method
exports.contactUs = (contact) => {
    // console.log('inside newProfile mailer', profile);
    console.log(contact);

    nodemailer.transporter.sendMail({
        from: 'ritiktaneja1842000@gmail.com',
        to: 'ritiktaneja1842000@gmail.com',
        subject: "CONTACT",
        html: `<div><b>Name :</b> ${contact.name} </div><br>
               <div><b>Email :</b> ${contact.email}</div><br>
               <div><b>Message :</b> ${contact.message}</div>`
    }, (err, info) => { //info carries the information about the request that has been sent
        if(err) {
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message Sent', info);
        return;
    });
}