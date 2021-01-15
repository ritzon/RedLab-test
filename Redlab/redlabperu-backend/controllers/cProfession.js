const sProfession = require("../services/sProfession");
const { makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");

async function getPagedProfession(req, res) {
  try {
    const range = req.query.range || '[0,9]'
    const [start, end] = JSON.parse(range)
    const limit = end - start + 1
    const professions = await sProfession.getPagedProfession(start, limit);
    makeResponseOk(res, {data: professions}, "global/master");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getAllProfession(req, res) {
  try {
    const professions = await sProfession.getAllProfession();
    makeResponseOk(res, {data: professions}, "global/masterAll");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getProfession(req,res) {
	try {
		let id = req.params.id;
		let profession = await sProfession.getProfession(id);
		makeResponseOk(res, {data: profession}, "global/masterOne");
	} catch(err){
		makeResponseException(res,err);
	}
}

async function createProfession(req, res) {
  try {
    await sProfession.createProfession(req.fields);
    makeResponseOkMessage(res, "I047");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updateProfession(req, res) {
  try {
    let body = req.fields
    let id = req.params.id
    await sProfession.updateProfession(id, body);
    makeResponseOkMessage(res, "I049");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function deleteProfession(req, res) {
    try {
      let id = req.params.id
      await sProfession.destroyProfession(id);
      makeResponseOkMessage(res, "I051");
    } catch(err) {
      makeResponseException(res, err);
    }
}
  

module.exports = {
  getAllProfession,
  getPagedProfession,
  getProfession,
  createProfession,
  updateProfession,
  deleteProfession
}