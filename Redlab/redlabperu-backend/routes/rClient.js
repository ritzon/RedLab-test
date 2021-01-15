var express = require("express"),
	cClient = require("../controllers/cClient");

var router = express.Router();

router.get("/",cClient.getClientAll);
router.get("/doc/search",cClient.getClientByDOC);
router.get("/:id",cClient.getClient);
router.delete("/:user_id", cClient.destroyClient);
router.put("/:user_id", cClient.updateClient);

module.exports = router;
