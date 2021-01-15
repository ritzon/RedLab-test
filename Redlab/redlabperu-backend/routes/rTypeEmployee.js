var express = require("express"),
	cTypeEmployee = require("../controllers/cTypeEmployee");

var router = express.Router();

router.get("/",cTypeEmployee.getPagedTypeEmployee);
router.get("/all",cTypeEmployee.getAllTypeEmployee);
router.post("/",cTypeEmployee.createTypeEmployee);
router.get("/:id",cTypeEmployee.getTypeEmployee);
router.put("/:id",cTypeEmployee.updateTypeEmployee);
router.delete("/:id",cTypeEmployee.deleteTypeEmployee);

module.exports = router;
