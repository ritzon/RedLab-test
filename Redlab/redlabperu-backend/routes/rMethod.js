var express = require("express"),
	cMethod = require("../controllers/cMethod");

var router = express.Router();

router.get("/all",cMethod.getAllMethod);
router.get("/",cMethod.getPagedMethod);
router.post("/",cMethod.createMethod);
router.get("/:id",cMethod.getMethod);
router.put("/:id",cMethod.updateMethod);
router.delete("/:id",cMethod.deleteMethod);

module.exports = router;
