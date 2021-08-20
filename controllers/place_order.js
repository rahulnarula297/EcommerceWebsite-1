const Orders = require('../models/orders.js');
const Profile = require('../models/profile');
const Product = require('../models/product');
const verificationEmail = require('../mailers/verification.js');
const orderEmail = require('../mailers/orders.js');

module.exports.verifyOrder = async function(req,res) {
    try {
        if(req.xhr) {
            let product = req.params.productId;
            let info = JSON.parse(JSON.stringify(req.body));
            let verified = false;

            function generate(){
                let num='1234567890';
                let OTP='';
                for(let i=0;i<5;i++){
                    OTP += num[Math.floor(Math.random()*10)];
                }
                return OTP;
            }
            
            await Orders.findOne({email:info.email},async function(err, foundOrder) {
                if(err) {
                    console.log('error', err);
                    return res.redirect('back');
                }
                if(foundOrder) {
                    if(foundOrder.isVerified == true) {
                        verified = true;
                    }
                    else {
                        verified = false;
                        let OTP = generate();
                        verificationEmail.verify(info,OTP);   
                        foundOrder.otp = OTP;     
                        foundOrder.save();                
                    }
                }
                else {
                    let otp = generate();
                    verificationEmail.verify(info,otp);
                    await Orders.create({
                        name: info.name,
                        phone: info.phone,
                        email: info.email,
                        address: info.address,
                        delivery_date: info.date,
                        isVerified: false,
                        otp: otp
                    });
                    verified = false
                }
            })  
            console.log(verified);
            return res.status(200).json({
                data: {
                    verified: verified
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

module.exports.confirmOTP = async function(req,res) {
    if(req.xhr) {
        let product = req.params.productId;
        let info = JSON.parse(JSON.stringify(req.body));
        console.log(info);
        Orders.findOne({email:info.email},(err,foundOrder)=>{
            if(err){
                console.log('err',err);
                res.redirect('back');
            }
            else{
                if(info.OTP==foundOrder.otp){
                    console.log('successful otp confirmation');
                    foundOrder.isVerified = true;
                    foundOrder.otp ="****";
                    foundOrder.save();
                }
                else{
                    console.log('wrong otp');
                }
            }
            return res.status(200).json({
                data: {
                    order: foundOrder
                },
                message: "OTP Entered"
            })
        })
    }
}

module.exports.placeOrder = async function(req,res) {
    if(req.xhr) {
        let product = req.params.productId;
        let profile = req.params.profileId;
        let info = JSON.parse(JSON.stringify(req.body));
        await Orders.findOne({email:info.email},async (err,foundOrder)=>{
            if(err){
                console.log('err',err);
                res.redirect('back');
            }
            foundOrder.product.push({
                productId: product,
                profileId: profile,
                address: info.address,
                delivery_date: info.delivery_date,
                flavour: info.flavour,
                weight: info.weight,
                ordered_date: info.ordered_date,
                isConfirmed: false,
                isCancelled: false,
                isDelivered: false
            });
            foundOrder.save();
            await Profile.findById({_id:profile},async function(err,foundProfile) {
                if(err) {
                    console.log('error',err);
                    res.redirect('back');
                }
                Product.findById({_id:product},async function(err,foundProduct) {
                    if(err) {
                        console.log('error',err);
                        return res.redirect('back');
                    }

                    orderEmail.order(info,foundOrder,foundProfile,foundProduct);
                    return res.status(200).json({
                        data: {
                            order_details: foundOrder,
                            profile_details: foundProfile,
                            product_details: foundProfile
                        },
                        message: "Order Placed"
                    })
                })
            })
        })
    }
}