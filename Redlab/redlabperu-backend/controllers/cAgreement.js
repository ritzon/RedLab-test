const sAgreement = require("../services/sAgreement"),
	{ makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");
  secret_key = require("../config").secret_key;

async function getPagedAgreement(req, res) {
  try {
    const range = req.query.range || '[0,9]'
    const [start, end] = JSON.parse(range)
    const limit = end - start + 1
    const agreements = await sAgreement.getPagedAgreement(start, limit);
    makeResponseOk(res, {data: agreements}, "agreement/listAgreement");	
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getAllAgreement(req, res) {
  try {
    const agreements = await sAgreement.getAllAgreement();
    makeResponseOk(res, {data: agreements}, "global/masterAll");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getAgreement(req,res) {
	try {
		let id = req.params.id;
		let agreement = await sAgreement.getAgreement(id);
		makeResponseOk(res, {agreement}, "agreement/getAgreement");
	} catch(err){
		makeResponseException(res,err);
	}
}

async function createAgreement(req, res) {
  try {
    await sAgreement.createAgreement(req.fields);
    makeResponseOkMessage(res, "I018");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updateAgreement(req, res) {
  try {
    let body = req.fields
    let id = req.params.id
    await sAgreement.updateAgreement(id, body);
    makeResponseOkMessage(res, "I020");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function deleteAgreement(req, res) {
    try {
      let id = req.params.id
      await sAgreement.destroyAgreement(id);
      makeResponseOkMessage(res, "I022");
    } catch(err) {
      makeResponseException(res, err);
    }
}
  

module.exports = {
  getAllAgreement,
  getPagedAgreement,
  getAgreement,
  createAgreement,
  updateAgreement,
  deleteAgreement
}