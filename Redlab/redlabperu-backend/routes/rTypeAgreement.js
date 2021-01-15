var express = require("express"),
	cTypeAgreement = require("../controllers/cTypeAgreement");

var router = express.Router();

router.get("/all",cTypeAgreement.getAllTypeAgreement);

module.exports = router;
