const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com', //domain created by google for us to interact with gmail mailing services
    port: 587,
    secure: false,
    auth: {
        user: process.env.nodemailer_mail,
        pass: process.env.nodemailer_password
    }
});

let renderTemplate = (data, relativePath) => { 
    let mailHtml; 
    ejs.renderFile(
        path.join(__dirname,'../views/mailers', relativePath),
        data,
        function(err, template) { //callback
            if(err) {
                console.log('error in rendering template', err);
                return;
            }
            mailHtml = template;
        }
    )

    return mailHtml;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}