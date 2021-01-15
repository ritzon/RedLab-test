const sEmployee = require("../services/sEmployee"),
	{ makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");
const {getFirstPropertyOfObject} = require('../global/helpers');


async function getPagedEmployee(req,res) {
  try {
    const range = req.query.range || '[0,9]'
    const [start, end] = JSON.parse(range)
    const limit = end - start + 1
    const query = req.query;
    let data = await sEmployee.getPagedEmployee(start, limit, query);
    //res.json(data)
    makeResponseOk(res, {data}, "employee/listEmployees")	
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getAllEmployee(req,res) {
  try {
    const query = req.query;
    let data = await sEmployee.getAllEmployee(query);
    makeResponseOk(res, {data}, "employee/all")	
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getEmployeeByTypeEmployee(req,res) {
  try {
    const {typeEmployeeId} = req.params;
    let employees = await sEmployee.getEmployeeByTypeEmployeeId(typeEmployeeId);
    makeResponseOk(res, {employees}, "employee/listEmployeesByTypeE"); 
  } catch(err) {
    makeResponseException(res, err);
  }
} 

async function getEmployee(req, res) {
  try {
    const id = req.params.id;
    const employee = await sEmployee.getEmployee(id);
    makeResponseOk(res, {employee}, "employee/getEmployee");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updateEmployee(req, res) {
  try {
    const fields = JSON.parse(getFirstPropertyOfObject(req.fields))
		const file = getFirstPropertyOfObject(req.files)
    await sEmployee.updateEmployee(req.params.user_id, fields, file);
    makeResponseOkMessage(res, "I002");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function destroyEmployee(req, res) {
  try {
    await sEmployee.destroyEmployee(req.params.user_id);
    makeResponseOkMessage(res, "I004")
  } catch(err) {
    makeResponseException(res, err);
  }
}



module.exports = {
  getPagedEmployee,
  getEmployee,
  getEmployeeByTypeEmployee,
  updateEmployee,
  destroyEmployee,
  getAllEmployee
}