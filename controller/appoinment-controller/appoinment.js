const Appoinment = require("../../db/models/appoinment");
const { errorResponse, successResponse } = require("../../helpers/response/response");
const codes = require("../../helpers/response/httpStatusCodes");

exports.takeAppoinment = async (req, res) => {
    console.log(req.user);
    try {
        req.body.patient_id = req.user._id;
        const appoinment = await Appoinment.create(req.body);

        successResponse(res, "Appoinment successfully generated..!", appoinment);
    } catch (e) {
        console.log(e);

        errorResponse(res, "server error", codes.InternalServerError);
    }

}