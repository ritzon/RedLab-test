const sTuition = require("../services/sTuition");
const { makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");

async function getPagedTuition(req, res) {
  try {
    const range = req.query.range || '[0,9]'
    const [start, end] = JSON.parse(range)
    const limit = end - start + 1
    const specialities = await sTuition.getPagedTuition(start, limit);
    makeResponseOk(res, {data: specialities}, "global/master");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getAllTuition(req, res) {
  try {
    const specialities = await sTuition.getAllTuition();
    makeResponseOk(res, {data: specialities}, "global/masterAll");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getTuition(req,res) {
	try {
		let id = req.params.id;
		let tuition = await sTuition.getTuition(id);
		makeResponseOk(res, {data: tuition}, "global/masterOne");
	} catch(err){
		makeResponseException(res,err);
	}
}

async function createTuition(req, res) {
  try {
    await sTuition.createTuition(req.fields);
    makeResponseOkMessage(res, "I021");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updateTuition(req, res) {
  try {
    let body = req.fields
    let id = req.params.id
    await sTuition.updateTuition(id, body);
    makeResponseOkMessage(res, "I023");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function deleteTuition(req, res) {
    try {
      let id = req.params.id
      await sTuition.destroyTuition(id);
      makeResponseOkMessage(res, "I025");
    } catch(err) {
      makeResponseException(res, err);
    }
}
  

module.exports = {
  getAllTuition,
  getPagedTuition,
  getTuition,
  createTuition,
  updateTuition,
  deleteTuition
}