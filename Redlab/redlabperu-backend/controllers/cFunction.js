const sFunction = require("../services/sFunction"),
	{ makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");
    secret_key = require("../config").secret_key;

async function getAllFunctions(req, res) {
  try {
    const functions = await sFunction.getAllFunctions();
    makeResponseOk(res, {functions}, "function/listFunction");	
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getFunction(req,res) {
	try {
		let id = req.params.id;
		let auxFunction = await sFunction.getFunction(id);
		//res.status(200).json(auxFunction)
		makeResponseOk(res, {auxFunction}, "function/getFunction");
	} catch(err){
		makeResponseException(res,err);
	}
}

async function getRolesForFunction(req,res) {
	try{
		let id = req.params.id;
		let roles = await sFunction.getRolesForFunction(id);
		makeResponseOk(res, {data:roles}, "global/master")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getActionsByRole(req, res) {
	try {
		let { id, role_id} = req.params;
		let auxFunction = await sFunction.getActionsByRole(id, role_id);
		//res.status(200).json(auxFunction);
		makeResponseOk(res, { auxFunction }, "function/getActionByRole");
	} catch(err) {
		makeResponseException(res, err);
	}
}

async function getAllLinkableFunctions(req, res) {
  try {
    const functions = await sFunction.getLinkableFunctions();
    makeResponseOk(res, {functions}, "function/listLinkableFunction");	
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function addFunction(req,res) {
	try {
		let data = req.fields;
		await sFunction.createFunction(data);
		makeResponseOkMessage(res,'I012');
	} catch(err) {
		makeResponseException(res,err)
	}
}

async function updateFunction(req,res) {
	try {
		let data = req.fields;
		let id = req.params.id;
		await sFunction.updateFunction(id, data);
		makeResponseOkMessage(res,'I014')
	} catch(err){
		makeResponseException(res,err)
	}
}

async function deleteFunction(req,res) {
	try{
		let id = req.params.id;
		await sFunction.destroyFunction(id);
		makeResponseOkMessage(res,'I016')
	}catch(err){
		makeResponseException(res,err)
	}
}

module.exports = {
  getAllFunctions,
  getFunction,
	getRolesForFunction,
	getAllLinkableFunctions,
	getActionsByRole,
  addFunction,
  updateFunction,
  deleteFunction
}