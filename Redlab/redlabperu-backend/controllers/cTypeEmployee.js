const sTypeEmployee = require("../services/sTypeEmployee");
const { makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");

async function getPagedTypeEmployee(req, res) {
  try {
    const range = req.query.range || '[0,9]'
    const [start, end] = JSON.parse(range)
    const limit = end - start + 1
    const typeEmployees = await sTypeEmployee.getPagedTypeEmployee(start, limit);
    makeResponseOk(res, {data: typeEmployees}, "global/master");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getAllTypeEmployee(req, res) {
  try {
    const typeEmployees = await sTypeEmployee.getAllTypeEmployee();
    makeResponseOk(res, {data: typeEmployees}, "global/masterAll");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getTypeEmployee(req,res) {
	try {
		let id = req.params.id;
		let typeEmployee = await sTypeEmployee.getTypeEmployee(id);
		makeResponseOk(res, {data: typeEmployee}, "global/masterOne");
	} catch(err){
		makeResponseException(res,err);
	}
}

async function createTypeEmployee(req, res) {
  try {
    await sTypeEmployee.createTypeEmployee(req.fields);
    makeResponseOkMessage(res, "I041");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updateTypeEmployee(req, res) {
  try {
    let body = req.fields
    let id = req.params.id
    await sTypeEmployee.updateTypeEmployee(id, body);
    makeResponseOkMessage(res, "I043");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function deleteTypeEmployee(req, res) {
    try {
      let id = req.params.id
      await sTypeEmployee.destroyTypeEmployee(id);
      makeResponseOkMessage(res, "I045");
    } catch(err) {
      makeResponseException(res, err);
    }
}
  

module.exports = {
  getAllTypeEmployee,
  getPagedTypeEmployee,
  getTypeEmployee,
  createTypeEmployee,
  updateTypeEmployee,
  deleteTypeEmployee
}