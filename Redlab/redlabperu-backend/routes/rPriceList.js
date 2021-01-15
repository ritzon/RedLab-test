var express = require("express"),
	cPriceList = require("../controllers/cPriceList");

var router = express.Router();

router.get("/",cPriceList.getAllPriceList); // accepts query
router.post("/",cPriceList.createPriceList);
router.get("/:id",cPriceList.getPriceList);
router.put("/:id",cPriceList.updatePriceList);
router.delete("/:id",cPriceList.deletePriceList);

module.exports = router;
