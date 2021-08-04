const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    isVerified: {
        type: Boolean
    },
    product: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        address: {
            type: String
        },
        delivery_date: {
            type: Date
        },
        flavour: {
            type: String
        },
        weight: {
            type: String
        },
        isConfirmed: {
            type: Boolean
        },
        isCancelled: {
            type: Boolean
        },
        isDelivered: {
            type: Boolean
        },
        profileId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Profile'
        }
    }],
    otp: {
        type: String
    }
},{
    timestamps: true
})

const Order = mongoose.model('orders',orderSchema);

module.exports = Order;