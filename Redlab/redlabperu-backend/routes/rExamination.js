var express = require("express"),
	cExamination = require("../controllers/cExamination");

var router = express.Router();

router.get("/",cExamination.getPagedExamination);
router.get("/all",cExamination.getAllExamination);
router.get("/filter",cExamination.getFilterExamination);
router.post("/",cExamination.createExamination);
router.get("/:id",cExamination.getExamination);
router.put("/:id",cExamination.updateExamination);
router.delete("/:id",cExamination.deleteExamination);

module.exports = router;
