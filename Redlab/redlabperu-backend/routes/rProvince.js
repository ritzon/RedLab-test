var express = require("express"),
	cProvince = require("../controllers/cProvince");

var router = express.Router();

router.get("/district/:id",cProvince.getDistrictsForProvince);


module.exports = router;
