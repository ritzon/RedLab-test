const sSpeciality = require("../services/sSpeciality");
const { makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");

async function getPagedSpeciality(req, res) {
  try {
    const range = req.query.range || '[0,9]'
    const [start, end] = JSON.parse(range)
    const limit = end - start + 1
    const specialities = await sSpeciality.getPagedSpeciality(start, limit);
    makeResponseOk(res, {data: specialities}, "global/master");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getAllSpeciality(req, res) {
  try {
    const specialities = await sSpeciality.getAllSpeciality();
    makeResponseOk(res, {data: specialities}, "global/masterAll");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getSpeciality(req,res) {
	try {
		let id = req.params.id;
		let speciality = await sSpeciality.getSpeciality(id);
		makeResponseOk(res, {data: speciality}, "global/masterOne");
	} catch(err){
		makeResponseException(res,err);
	}
}

async function createSpeciality(req, res) {
  try {
    await sSpeciality.createSpeciality(req.fields);
    makeResponseOkMessage(res, "I009");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updateSpeciality(req, res) {
  try {
    let body = req.fields
    let id = req.params.id
    await sSpeciality.updateSpeciality(id, body);
    makeResponseOkMessage(res, "I011");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function deleteSpeciality(req, res) {
    try {
      let id = req.params.id
      await sSpeciality.destroySpeciality(id);
      makeResponseOkMessage(res, "I013");
    } catch(err) {
      makeResponseException(res, err);
    }
}
  

module.exports = {
  getPagedSpeciality,
  getSpeciality,
  createSpeciality,
  updateSpeciality,
  deleteSpeciality,
  getAllSpeciality
}