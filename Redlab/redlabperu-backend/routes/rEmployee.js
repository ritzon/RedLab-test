var express = require("express"),
	cEmployee = require("../controllers/cEmployee");

var router = express.Router();

router.get("/",cEmployee.getPagedEmployee);
router.get("/all",cEmployee.getAllEmployee);
router.get("/:id", cEmployee.getEmployee);
router.get("/type/:typeEmployeeId", cEmployee.getEmployeeByTypeEmployee);
router.delete("/:user_id", cEmployee.destroyEmployee);
router.put("/:user_id", cEmployee.updateEmployee);

module.exports = router;
