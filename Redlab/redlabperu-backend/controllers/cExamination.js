const sExamination = require("../services/sExamination");
const { makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");

async function getPagedExamination(req, res) {
  try {
    const range = req.query.range || '[0,9]'
    const [start, end] = JSON.parse(range)
    const limit = end - start + 1
    const examinations = await sExamination.getPagedExamination(start, limit);
    makeResponseOk(res, {data: examinations}, "examination/paged");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getAllExamination(req, res) {
  try {
    const examinations = await sExamination.getAllExamination();
    makeResponseOk(res, {data: examinations}, "examination/all");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getFilterExamination(req, res) {
  try {
    const query = req.query;
    const examinations = await sExamination.getFilterExamination(query);
    //res.status(200).json(examinations);
    makeResponseOk(res, {data: examinations}, "examination/paged");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getExamination(req,res) {
	try {
		let id = req.params.id;
		let examination = await sExamination.getExamination(id);
		makeResponseOk(res, {data: examination}, "examination/one");
	} catch(err){
		makeResponseException(res,err);
	}
}

async function createExamination(req, res) {
  try {
    await sExamination.createExamination(req.fields);
    makeResponseOkMessage(res, "I033");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updateExamination(req, res) {
  try {
    let body = req.fields
    let id = req.params.id
    await sExamination.updateExamination(id, body);
    makeResponseOkMessage(res, "I035");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function deleteExamination(req, res) {
    try {
      let id = req.params.id
      await sExamination.destroyExamination(id);
      makeResponseOkMessage(res, "I037");
    } catch(err) {
      makeResponseException(res, err);
    }
}
  

module.exports = {
  getAllExamination,
  getPagedExamination,
  getExamination,
  getFilterExamination,
  createExamination,
  updateExamination,
  deleteExamination
}