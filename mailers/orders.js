const nodemailer = require('../config/nodemailer');

//function that will send that mail
//we are using another way of exporting a method
exports.order = (order_details,profile_details,product_details) => {

    nodemailer.transporter.sendMail({
        from: process.env.nodemailer_mail,
        to: `${order_details.email},tanejaritik1840@gmail.com`,
        subject: "Order INFO",
        html: `<div><b>Your Order has been placed</b></div>`
    }, (err, info) => { //info carries the information about the request that has been sent
        if(err) {
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message Sent', info);
        return;
    });
}