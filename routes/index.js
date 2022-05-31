const express = require("express");
const router = express();
const userRoute = require("../routes/user/user");
const appoinmentRoute = require("../routes/appoinment/appoinment");
const doctorRoute = require("../routes/doctor/doctor");

router.use("/user", userRoute);

router.use("/appoinment", appoinmentRoute);

router.use("/doctor", doctorRoute);

module.exports = router;