
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required'],
        minLength: 3,
        maxLength: 32
    },
    
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Email is required']
    },

    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required']
    },

    about: {
        type: String,
        trim: true,
        default: ''
    },

    role: {
        type: Number, // 0 - user, 1 - admin
        default: 0
    },

    history: {
        //purchase history
        type: Array,
        default: []
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model('User', userSchema);