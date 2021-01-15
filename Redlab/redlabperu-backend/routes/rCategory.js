var express = require("express"),
	cCategory = require("../controllers/cCategory");

var router = express.Router();

router.get("/",cCategory.getAllCategory);
router.post("/",cCategory.createCategory);
router.get("/:id",cCategory.getCategory);
router.put("/:id",cCategory.updateCategory);
router.delete("/:id",cCategory.deleteCategory);

module.exports = router;
