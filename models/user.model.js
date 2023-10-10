const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User

let userSchema = new Schema({
    username: { 
        type: String, 
        min: 2,
        max: 25,
        required: [true, 'Please add your username'], 
        unique: true 
    },
    email: { 
        type: String, 
        max: 50,
        required: [true, 'Please add your email'], 
        unique: true 
    },
    password: { 
        type: String, 
        min: 5,
        required: [true, 'Please add your password'] 
    },
    saved: {
        type: Array,
        default: [],
    },
    reviews: {
        type: Array,
        default: [],
    }
}, { timestamps: true });

let Users = mongoose.model('Users', userSchema, 'user');

module.exports = { Users };