var express = require("express"),
	cAppointment = require("../controllers/cAppointment");

var router = express.Router();

router.get("/",cAppointment.getAppointmentsAll);
router.post("/",cAppointment.addAppointment);
router.get("/:id",cAppointment.getAppointment);
router.get("/result/:id",cAppointment.getAppointmentResults);
router.put("/:id",cAppointment.updateAppointment);
router.put("/attend/:id",cAppointment.attendAppointment);
router.delete("/:id",cAppointment.deleteAppointment);

module.exports = router;