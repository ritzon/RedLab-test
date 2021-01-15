const sAppointment = require("../services/sAppointment"),
	{makeResponseOkMessage, makeResponseOk, makeResponseException} = require("../global/response");
	
const sEmployee = require("../services/sEmployee");

async function getAppointmentsAll(req,res) {
	try{
		const range = req.query.range || '[0,9]'
    const [start, end] = JSON.parse(range)
    const limit = end - start + 1
    const query = req.query;
		let appointments = await sAppointment.getAppointmentAll(start, limit, query);
		makeResponseOk(res, {data: appointments}, "appointment/listAppointment")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getAppointment(req,res) {
	try{
		let id = req.params.id;
		let appointment = await sAppointment.getAppointment(id)
		//res.json(appointment)
		makeResponseOk(res, {appointment}, "appointment/getAppointment")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getAppointmentResults(req,res) {
	try{
		let id = req.params.id;
		let result = await sAppointment.getAppointmentResults(id)
		//res.json(result)
	  makeResponseOk(res, {data: result}, "appointment/result")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function addAppointment(req, res) {
  try {
    let data = req.fields;
    await sAppointment.addAppointment(data);
    makeResponseOkMessage(res, 'I034');
  } catch(err) {
    makeResponseException(res,err);
  }
}

async function updateAppointment(req, res) {
  try {
    let id = req.params.id;
    let data = req.fields;
    await sAppointment.updateAppointment(id, data);
    makeResponseOkMessage(res, 'I036');
  } catch(err) {
    makeResponseException(res,err);
  }
}

async function deleteAppointment(req, res) {
  try {
    let id = req.params.id;
    await sAppointment.deleteAppointment(id);
    makeResponseOkMessage(res, 'I038');
  } catch(err) {
    makeResponseException(res,err);
  }
}

async function attendAppointment(req, res) {
  try {
    let id = req.params.id;
    let data = req.fields;
    await sAppointment.attendAppointment(id, data);
    makeResponseOkMessage(res, 'I039');
  } catch(err) {
  	console.log(err)
    makeResponseException(res,err);
  }
}

module.exports = {
	getAppointmentsAll,
  getAppointment,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentResults,
  attendAppointment
}