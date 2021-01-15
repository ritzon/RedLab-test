const sRole = require("../services/sRole"),
	{ makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");

async function getPagedRole(req, res) {
  try {
    const range = req.query.range || '[0,9]'
    const [start, end] = JSON.parse(range)
    const limit = end - start + 1
    const specialities = await sRole.getPagedRole(start, limit);
    makeResponseOk(res, {data: specialities}, "role/listRoles");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getAllRole(req, res) {
  try {
    const specialities = await sRole.getAllRole();
    makeResponseOk(res, {data: specialities}, "global/masterAll");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getRole(req,res) {
	try {
		let id = req.params.id;
		let role = await sRole.getRole(id);
		makeResponseOk(res, {role}, "role/getRole");
	} catch(err){
		makeResponseException(res,err);
	}
}

async function createRole(req, res) {
  try {
    const role = await sRole.createRole(req.fields);
    makeResponseOkMessage(res, "I006");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updateRole(req, res) {
  try {
    let body = req.fields
		let id = req.params.id
    const role = await sRole.updateRole(id, body);
    makeResponseOkMessage(res, "I008");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getFunctionsForRole(req,res) {
	try{
		let id = req.params.id;
		let functions = await sRole.getFunctionsForRole(id);
		makeResponseOk(res, {data:functions}, "global/master");
	}catch(err){
		makeResponseException(res,err)
	}
}

module.exports = {
  getPagedRole,
  getAllRole,
  getRole,
  createRole,
  updateRole,
  getFunctionsForRole
}