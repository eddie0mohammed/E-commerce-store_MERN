
const mongoose = require('mongoose');



const productSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        unique: true, 
        required: [true, 'Product name is required'],
        maxlength: 32,
        minLength: 3
    },

    description: {
        type: String,
        trim: true,
        required: [true, 'Product description is required'],
        maxlength: 1000
    },

    price: {
        type: Number,
        trim: true,
        required: [true, 'Product price is requried']
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    quantity: {
        type: Number,
        default: 0
    },

    productImageURL: {
        type: String,
        required: [true, 'Product image is required']
    },

    shipping: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model('Product', productSchema);