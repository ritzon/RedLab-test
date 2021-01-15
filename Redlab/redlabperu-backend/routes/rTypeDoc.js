var express = require("express"),
	cTypeDoc = require("../controllers/cTypeDoc");

var router = express.Router();

router.get("/",cTypeDoc.getPagedTypeDoc);
router.get("/all",cTypeDoc.getAllTypeDoc);
router.post("/",cTypeDoc.createTypeDoc);
router.get("/:id",cTypeDoc.getTypeDoc);
router.put("/:id",cTypeDoc.updateTypeDoc);
router.delete("/:id",cTypeDoc.deleteTypeDoc);

module.exports = router;
