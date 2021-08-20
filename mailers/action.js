const nodemailer = require('../config/nodemailer');
const moment = require('moment');

//function that will send that mail
//we are using another way of exporting a method
exports.confirmOrder = (order_details,ordered_product) => {
    nodemailer.transporter.sendMail({
        from: process.env.nodemailer_mail,
        to: `${order_details.email}`,
        subject: "Order Confirmed",
        html: `<div>Hi <b>${order_details.name}</b>, your order with order ID: <b>${ordered_product._id}</b> has been confirmed and will be delivered to you on or before <b>${moment(ordered_product.delivery_date).format('MMMM Do YYYY')}</b>.</div>`
    }, (err, info) => { //info carries the information about the request that has been sent
        if(err) {
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message Sent', info);
        return;
    });
}

exports.cancelOrder = (order_details,ordered_product) => {
    nodemailer.transporter.sendMail({
        from: process.env.nodemailer_mail,
        to: `${order_details.email}`,
        subject: "Order Cancelled",
        html: `<div>Hi <b>${order_details.name}</b>, your order with order ID: <b>${ordered_product._id}</b> has been cancelled by the vendor for some reason.</div>`
    }, (err, info) => { //info carries the information about the request that has been sent
        if(err) {
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message Sent', info);
        return;
    });
}