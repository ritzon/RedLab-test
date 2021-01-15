var express = require("express"),
	cTuition = require("../controllers/cTuition");

var router = express.Router();

router.get("/",cTuition.getPagedTuition);
router.get("/all",cTuition.getAllTuition);
router.post("/",cTuition.createTuition);
router.get("/:id",cTuition.getTuition);
router.put("/:id",cTuition.updateTuition);
router.delete("/:id",cTuition.deleteTuition);

module.exports = router;
