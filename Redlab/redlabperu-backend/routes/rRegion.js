var express = require("express"),
	cRegion = require("../controllers/cRegion");

var router = express.Router();

router.get("/",cRegion.getRegions);
router.get("/province/:id",cRegion.getProvincesForRegion);


module.exports = router;
