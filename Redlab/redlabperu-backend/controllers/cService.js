const sService = require("../services/sService"),
	{ makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");

async function getPagedService(req, res) {
  try {
    const range = req.query.range || '[0,9]'
    const [start, end] = JSON.parse(range)
    const limit = end - start + 1
    const specialities = await sService.getPagedService(start, limit);
    makeResponseOk(res, {data: specialities}, "global/master");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getAllService(req, res) {
  try {
    const specialities = await sService.getAllService();
    makeResponseOk(res, {data: specialities}, "global/masterAll");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getService(req,res) {
	try {
		let id = req.params.id;
		let service = await sService.getService(id);
		makeResponseOk(res, {data: service}, "global/masterOne");
	} catch(err){
		makeResponseException(res,err);
	}
}

async function createService(req, res) {
  try {
    await sService.createService(req.fields);
    makeResponseOkMessage(res, "I024");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updateService(req, res) {
  try {
    let body = req.fields
    let id = req.params.id
    await sService.updateService(id, body);
    makeResponseOkMessage(res, "I026");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function deleteService(req, res) {
  try {
    let id = req.params.id
    await sService.destroyService(id);
    makeResponseOkMessage(res, "I028");
  } catch(err) {
    makeResponseException(res, err);
  }
}
  

module.exports = {
  getAllService,
  getPagedService,
  getService,
  createService,
  updateService,
  deleteService
}