const Doctor = require("../../db/models/doctor");
const { successResponse, errorResponse } = require("../../helpers/response/response");
const codes = require("../../helpers/response/httpStatusCodes");
const Appoinment = require("../../db/models/appoinment");
const mongoose = require("mongoose");

exports.registerDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.create(req.body);
        let responseDoctor = { name: doctor.name, fee: doctor.fee, status: doctor.status }
        successResponse(res, "success", responseDoctor);
    } catch (e) {
        errorResponse(res, "server error", codes.InternalServerError);
    }
}

exports.getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        successResponse(res, "success", doctors);
    } catch (e) {
        errorResponse(res, "Internal server error", codes.InternalServerError)
    }
}

exports.getPatients = async (req, res) => {
    try {
        const appoinments = await Appoinment.aggregate([
            { $match: { doctor_id: mongoose.Types.ObjectId(req.params.id) } },
            {
                $lookup: {
                    from: "users",
                    localField: "patient_id",
                    foreignField: "_id",
                    as: "patienttData"
                }
            }
        ])

        let responseAppoinment = appoinments.map(data => {
            console.log(data);
            let filtered = { patient: { name: data.patienttData[0].name, email: data.patienttData[0].email, phone: data.patienttData[0].phone }, appointment_date: data.appointment_date, appointment_slot: data.appointment_slot, approval_status: data.approval_status, payment_status: data.payment_status }
            return filtered;
        });


        successResponse(res, "success", responseAppoinment);

    } catch (e) {
        console.log(e);
        errorResponse(res, "server error", codes.InternalServerError);
    }
}

exports.updateAppoinment = async (req, res) => {
    try {
        await Appoinment.findByIdAndUpdate({ _id: req.body.id },
            {
                $set: {
                    approval_status: req.body.approval_status
                }
            })
        const appoinments = await Appoinment.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(req.body.id) } },
            {
                $lookup: {
                    from: "users",
                    localField: "patient_id",
                    foreignField: "_id",
                    as: "patienttData"
                }
            }
        ])

        let responseAppoinment = appoinments.map(data => {
            let filtered = { patient: { name: data.patienttData[0].name, email: data.patienttData[0].email, phone: data.patienttData[0].phone }, appointment_date: data.appointment_date, appointment_slot: data.appointment_slot, approval_status: data.approval_status, payment_status: data.payment_status }
            return filtered;
        });

        successResponse(res, "success", responseAppoinment)
    } catch (e) {
        errorResponse(res, "server error", codes.InternalServerError)
    }
}