const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        fee:{
            type: Number,
            required: true
        },
        status: {
            type: String,
        }

    },
    {
        timestamps:true,
    }
    
);

module.exports = mongoose.model('Doctor',doctorSchema);