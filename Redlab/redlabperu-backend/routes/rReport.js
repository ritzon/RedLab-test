var express = require("express"),
	cReport = require("../controllers/cReport");

var router = express.Router();

router.get("/appointments",cReport.getAppointmentsByMonth);
router.get("/result/:id",cReport.getAppointmentResultsPDF);

module.exports = router;