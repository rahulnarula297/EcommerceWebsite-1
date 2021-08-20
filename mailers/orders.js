const nodemailer = require('../config/nodemailer');

//function that will send that mail
//we are using another way of exporting a method
exports.order = (ordered_product,order_details,profile_details,product_details) => {
    let data = {};
    data.order = ordered_product
    data.customer = order_details;
    data.profile = profile_details;
    data.product = product_details;
    let htmlTemplate = nodemailer.renderTemplate({data:data}, '/order/placeOrder.ejs');
    nodemailer.transporter.sendMail({
        from: process.env.nodemailer_mail,
        to: `${order_details.email},tanejaritik1840@gmail.com`,
        subject: "Order INFO",
        html: htmlTemplate
    }, (err, info) => { //info carries the information about the request that has been sent
        if(err) {
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message Sent', info);
        return;
    });
}