const User = require("../../db/models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { successResponse, errorResponse } = require("../../helpers/response/response");
const codes = require("../../helpers/response/httpStatusCodes");
const Appoinment = require("../../db/models/appoinment");
const mongoose = require("mongoose");

exports.Signup = async (req, res) => {
    console.log(req.body);
    try {

        let userExist = await User.findOne({ email: req.body.email });
        if(userExist) return errorResponse(res, "User already exist", codes.BadRequest);

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create user
        req.body.password = hashedPassword
        const user = await User.create(req.body);
        const responseUser = {name: user.name, email: user.email, phone: user.phone, user_type: user.user_type, status: user.status};

        successResponse(res, "success", responseUser);
    } catch (e) {
        errorResponse(res, "Server Error", codes.InternalServerError)
    }

}

exports.Signin = async(req,res) => {

    try{

        const user = await User.findOne({email: req.body.email })
        if(!user) return errorResponse(res, "User not found", codes.NotFound);
        const salt = await bcrypt.genSalt(10);
        bcrypt.compare(req.body.password, user.password).then((status) => {
            if(status) {
                const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
                successResponse(res,"logged in", token)
            } else {
                errorResponse(res, "password error", codes.Unauthorized);
            }
        })

    } catch(e) {
        errorResponse(res, "server error", codes.InternalServerError);
    }

}

exports.Profile = async(req,res) => {
    try {
        const user_id = req.user._id;
        console.log(user_id);
        const user = await User.findOne({ _id: user_id });
        if(!user) return errorResponse(res, "profile not found", codes.NotFound);
        let responseUser = {name: user.name, email: user.email, phone: user.phone, user_type: user.user_type, status: user.status};
        successResponse(res, "sucess", responseUser);
    } catch(e) {
        errorResponse(res, "server error", codes.InternalServerError);    
    }
}

exports.getAppoinments = async(req,res) => {
    try {
        // const appoinments = await Appoinment.find({ patient_id: req.user._id });
        const appoinments = await Appoinment.aggregate([
            { $match: { patient_id:  mongoose.Types.ObjectId(req.user._id) } },
            {
                $lookup: {
                    from: "doctors",
                    localField: "doctor_id",
                    foreignField: "_id",
                    as: "doctorData"
                }
            }
        ])
        
        let responseAppoinment = appoinments.map(data => {
            let filtered = { doctor: {name: data.doctorData[0].name, fee: data.doctorData[0].fee}, appointment_date: data.appointment_date, appointment_slot: data.appointment_slot, approval_status: data.approval_status, payment_status: data.payment_status}
            return filtered;
        });

        successResponse(res, "success", responseAppoinment)
    } catch(e) {
        console.log(e);
        errorResponse(res, "server error", codes.InternalServerError);
    }
}

//update payment

exports.paymentUpdate = async(req,res) => {
    try {
        await Appoinment.findByIdAndUpdate({ _id: req.body.id },
            {
                $set: {
                    payment_status: req.body.payment_status
                }
            })

            const appoinments = await Appoinment.aggregate([
                { $match: { _id:  mongoose.Types.ObjectId(req.body.id) } },
                {
                    $lookup: {
                        from: "doctors",
                        localField: "doctor_id",
                        foreignField: "_id",
                        as: "doctorData"
                    }
                }
            ])
            
            let responseAppoinment = appoinments.map(data => {
                let filtered = { doctor: {name: data.doctorData[0].name, fee: data.doctorData[0].fee}, appointment_date: data.appointment_date, appointment_slot: data.appointment_slot, approval_status: data.approval_status, payment_status: data.payment_status}
                return filtered;
            });

            successResponse(res, "success", responseAppoinment);
    } catch(e) {
        errorResponse(res, "server error", codes.InternalServerError);
    }
}