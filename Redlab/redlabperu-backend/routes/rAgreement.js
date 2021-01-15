var express = require("express"),
	cAgreement = require("../controllers/cAgreement");

var router = express.Router();

router.get("/all",cAgreement.getAllAgreement);
router.get("/",cAgreement.getPagedAgreement);
router.post("/",cAgreement.createAgreement);
router.get("/:id",cAgreement.getAgreement);
router.put("/:id",cAgreement.updateAgreement);
router.delete("/:id",cAgreement.deleteAgreement);

module.exports = router;
