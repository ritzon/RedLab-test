var express = require("express"),
	cSpeciality = require("../controllers/cSpeciality");

var router = express.Router();

router.get("/",cSpeciality.getPagedSpeciality);
router.get("/all",cSpeciality.getAllSpeciality);
router.post("/",cSpeciality.createSpeciality);
router.get("/:id",cSpeciality.getSpeciality);
router.put("/:id",cSpeciality.updateSpeciality);
router.delete("/:id",cSpeciality.deleteSpeciality);

module.exports = router;
