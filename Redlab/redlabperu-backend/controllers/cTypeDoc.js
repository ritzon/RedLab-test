const sTypeDoc = require("../services/sTypeDoc");
const { makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");

async function getPagedTypeDoc(req, res) {
  try {
    const range = req.query.range || '[0,9]'
    const [start, end] = JSON.parse(range)
    const limit = end - start + 1
    const typeDocs = await sTypeDoc.getPagedTypeDoc(start, limit);
    makeResponseOk(res, {data: typeDocs}, "global/master");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getAllTypeDoc(req, res) {
  try {
    const typeDocs = await sTypeDoc.getAllTypeDoc();
    makeResponseOk(res, {data: typeDocs}, "global/masterAll");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getTypeDoc(req,res) {
	try {
		let id = req.params.id;
		let typeDoc = await sTypeDoc.getTypeDoc(id);
		makeResponseOk(res, {data: typeDoc}, "global/masterOne");
	} catch(err){
		makeResponseException(res,err);
	}
}

async function createTypeDoc(req, res) {
  try {
    await sTypeDoc.createTypeDoc(req.fields);
    makeResponseOkMessage(res, "I003");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updateTypeDoc(req, res) {
  try {
    let body = req.fields
    let id = req.params.id
    await sTypeDoc.updateTypeDoc(id, body);
    makeResponseOkMessage(res, "I005");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function deleteTypeDoc(req, res) {
    try {
      let id = req.params.id
      await sTypeDoc.destroyTypeDoc(id);
      makeResponseOkMessage(res, "I007");
    } catch(err) {
      makeResponseException(res, err);
    }
}
  

module.exports = {
  getAllTypeDoc,
  getPagedTypeDoc,
  getTypeDoc,
  createTypeDoc,
  updateTypeDoc,
  deleteTypeDoc
}