var express = require("express"),
	cRole = require("../controllers/cRole");

var router = express.Router();

router.get("/all",cRole.getAllRole);
router.get("/",cRole.getPagedRole);
router.post("/",cRole.createRole);
router.get("/:id",cRole.getRole);
router.put("/:id",cRole.updateRole);
router.get("/function/:id",cRole.getFunctionsForRole);

module.exports = router;
