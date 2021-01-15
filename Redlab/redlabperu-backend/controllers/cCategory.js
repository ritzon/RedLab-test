const sCategory = require("../services/sCategory");
const { makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");

async function getAllCategory(req, res) {
  try {
    const Categories = await sCategory.getAllCategory();
    makeResponseOk(res, {data: Categories}, "global/master");	
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getCategory(req,res) {
	try {
		let id = req.params.id;
		let typeDoc = await sCategory.getCategory(id);
		makeResponseOk(res, {data: typeDoc}, "global/masterOne");
	} catch(err){
		makeResponseException(res,err);
	}
}

async function createCategory(req, res) {
  try {
    await sCategory.createCategory(req.fields);
    makeResponseOkMessage(res, "I015");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updateCategory(req, res) {
  try {
    let body = req.fields
    let id = req.params.id
    await sCategory.updateCategory(id, body);
    makeResponseOkMessage(res, "I017");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function deleteCategory(req, res) {
    try {
      let id = req.params.id
      await sCategory.destroyCategory(id);
      makeResponseOkMessage(res, "I019");
    } catch(err) {
      makeResponseException(res, err);
    }
}
  

module.exports = {
  getAllCategory,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
}