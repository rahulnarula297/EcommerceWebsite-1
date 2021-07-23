const Orders = require('../models/orders.js');
const verificationEmail = require('../mailers/verification.js');

module.exports.verifyOrder = function(req,res) {
    try {
        if(req.xhr) {
            let product = req.params.productId;
            let info = JSON.parse(JSON.stringify(req.body));

            function generate(){
                let num='1234567890';
                let OTP='';
                for(let i=0;i<5;i++){
                    OTP += num[Math.floor(Math.random()*10)];
                }
                return OTP;
            }
            
            Orders.find({email:info.email}, function(foundOrder) {
                if(foundOrder) {
                    if(foundOrder.isVerified) {
                        
                    }
                }
                Orders.create({
                    name: info.name,
                    phone: info.phone,
                    email: info.email,
                    address: info.address,
                    delivery_date: info.date,
                    isVerified: false,
                    isConfirmed: false,
                    productId: product,
                })
            })

            verificationEmail.verify(info,generate());

            return res.status(200).json({
                data: {
                    info: req.body
                },
                message: "Details Added"
            })
        }

    } catch (error) {
        if(error) {
            console.log('error', error);
            return res.redirect('back');
        }
    }
}

module.exports.placeOrder = function() {

}