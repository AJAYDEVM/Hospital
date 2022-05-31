const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true
        },
        phone:{
            type: String,
            required: true
        },
        user_type: {
            type: String
        },
        password: {
            type: String
        },
        status: {
            type: String,
            // enum : ['approve','cancel','pending'],
            // default:'pending'
        }

    },
    {
        timestamps:true,
    }
    
);

module.exports = mongoose.model('User',userSchema);