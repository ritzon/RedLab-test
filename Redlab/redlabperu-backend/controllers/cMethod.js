const sMethod = require("../services/sMethod"),
	{ makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");

async function getPagedMethod(req, res) {
  try {
    const range = req.query.range || '[0,9]'
    const [start, end] = JSON.parse(range)
    const limit = end - start + 1
    const specialities = await sMethod.getPagedMethod(start, limit);
    makeResponseOk(res, {data: specialities}, "global/master");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getAllMethod(req, res) {
  try {
    const specialities = await sMethod.getAllMethod();
    makeResponseOk(res, {data: specialities}, "global/masterAll");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getMethod(req,res) {
	try {
		let id = req.params.id;
		let service = await sMethod.getMethod(id);
		makeResponseOk(res, {data: service}, "global/masterOne");
	} catch(err){
		makeResponseException(res,err);
	}
}

async function createMethod(req, res) {
  try {
    await sMethod.createMethod(req.fields);
    makeResponseOkMessage(res, "I050");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updateMethod(req, res) {
  try {
    let body = req.fields
    let id = req.params.id
    await sMethod.updateMethod(id, body);
    makeResponseOkMessage(res, "I052");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function deleteMethod(req, res) {
  try {
    let id = req.params.id
    await sMethod.destroyMethod(id);
    makeResponseOkMessage(res, "I054");
  } catch(err) {
    makeResponseException(res, err);
  }
}
  

module.exports = {
  getAllMethod,
  getPagedMethod,
  getMethod,
  createMethod,
  updateMethod,
  deleteMethod
}