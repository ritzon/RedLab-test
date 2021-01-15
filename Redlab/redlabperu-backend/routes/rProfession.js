var express = require("express"),
	cProfession = require("../controllers/cProfession");

var router = express.Router();

router.get("/",cProfession.getPagedProfession);
router.get("/all",cProfession.getAllProfession);
router.post("/",cProfession.createProfession);
router.get("/:id",cProfession.getProfession);
router.put("/:id",cProfession.updateProfession);
router.delete("/:id",cProfession.deleteProfession);

module.exports = router;
