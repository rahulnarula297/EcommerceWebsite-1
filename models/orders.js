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
    address: {
        type: String,
        required: true
    },
    delivery_date: {
        type: Date,
        required: true
    },
    isVerified: {
        type: Boolean
    },
    isConfirmed: {
        type: Boolean
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
},{
    timestamps: true
})

const Order = mongoose.model('orders',orderSchema);

module.exports = Order;