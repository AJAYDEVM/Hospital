const mongoose = require('mongoose');

const appoinmentSchema = new mongoose.Schema(
    {
        doctor_id:{
            type: mongoose.ObjectId,
            required: true,
        },
        patient_id:{
            type: mongoose.ObjectId,
            required: true
        },
        appointment_date:{
            type: Date,
            default: Date.now(),
            required: true
        },
        appointment_slot: {
            type: String
        },
        approval_status: {
            type: String,
            enum : ['approved','cancel','pending'],
            default:'pending'
        },
        payment_status: {
            type: String,
            enum : ['done','make'],
            default:'make'
        },


    },
    {
        timestamps:true,
    }
    
);

module.exports = mongoose.model('Appoinment',appoinmentSchema);

