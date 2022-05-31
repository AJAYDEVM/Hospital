const express = require("express");
const router = express();
const verify = require("../../helpers/verify-user/verify");
const appoinmentController = require("../../controller/appoinment-controller/appoinment");

router.post("/take-appoinment", verify, appoinmentController.takeAppoinment );




module.exports = router;