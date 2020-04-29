
const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxLength: 32,
        minLength: 3,
        unique: true
    }



});



module.exports = mongoose.model('Category', categorySchema);