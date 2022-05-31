const express = require("express");
const router = express();
const verify = require("../../helpers/verify-user/verify");
const doctorController = require("../../controller/doctor-controller/doctor");


router.post("/register-doctor", doctorController.registerDoctor );

router.get("/doctor-list", doctorController.getDoctors);

router.get("/patient-list/:id", doctorController.getPatients);

// update appoinment

router.put("/update-appoinment", doctorController.updateAppoinment);

module.exports = router;