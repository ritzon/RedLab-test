var express = require("express"),
	cService = require("../controllers/cService");

var router = express.Router();

router.get("/all",cService.getAllService);
router.get("/",cService.getPagedService);
router.post("/",cService.createService);
router.get("/:id",cService.getService);
router.put("/:id",cService.updateService);
router.delete("/:id",cService.deleteService);

module.exports = router;
