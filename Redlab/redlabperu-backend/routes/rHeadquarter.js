var express = require("express"),
	cHeadquarter = require("../controllers/cHeadquarter");

var router = express.Router();

router.get("/all",cHeadquarter.getAllHeadquarter);
router.get("/:id", cHeadquarter.getHeadquarter);
router.put("/:id", cHeadquarter.updateHeadquarter);
router.post("/", cHeadquarter.createHeadquarter);

module.exports = router;
