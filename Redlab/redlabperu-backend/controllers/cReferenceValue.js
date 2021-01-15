const sReferenceValue = require("../services/sReferenceValue");
const { makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");

async function getPagedReferenceValue(req, res) {
  try {
    const range = req.query.range || '[0,9]'
    const [start, end] = JSON.parse(range)
    const limit = end - start + 1
    const referenceValues = await sReferenceValue.getPagedReferenceValue(start, limit);
    makeResponseOk(res, {data: referenceValues}, "referenceValue/paged");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getAllReferenceValue(req, res) {
  try {
    const referenceValues = await sReferenceValue.getAllReferenceValue();
    makeResponseOk(res, {data: referenceValues}, "referenceValue/all");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getReferenceValue(req,res) {
	try {
		let id = req.params.id;
		let referenceValue = await sReferenceValue.getReferenceValue(id);
		makeResponseOk(res, {data: referenceValue}, "referenceValue/one");
	} catch(err){
		makeResponseException(res,err);
	}
}

async function createReferenceValue(req, res) {
  try {
    await sReferenceValue.createReferenceValue(req.fields);
    makeResponseOkMessage(res, "I027");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updateReferenceValue(req, res) {
  try {
    let body = req.fields
    let id = req.params.id
    await sReferenceValue.updateReferenceValue(id, body);
    makeResponseOkMessage(res, "I029");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function deleteReferenceValue(req, res) {
    try {
      let id = req.params.id
      await sReferenceValue.destroyReferenceValue(id);
      makeResponseOkMessage(res, "I031");
    } catch(err) {
      makeResponseException(res, err);
    }
}
  

module.exports = {
  getAllReferenceValue,
  getPagedReferenceValue,
  getReferenceValue,
  createReferenceValue,
  updateReferenceValue,
  deleteReferenceValue
}