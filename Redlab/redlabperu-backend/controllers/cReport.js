const sReport = require("../services/sReport"),
  {makeResponseOk,makeResponseOkMessage, makeResponseException} = require("../global/response");

async function getAppointmentsByMonth(req, res) {
  try {
    let query = req.query;
    const report = await sReport.getAppointmentsByMonth(query);
    //res.json(report)
    makeResponseOk(res, {report}, "report/appointmentsMonthly");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getAppointmentResultsPDF(req, res) {
  try {
    const report = await sReport.getAppointmentResultsPDF(req.params.id);
    //res.json(report)
    makeResponseOk(res, {data: report}, "report/result");
  } catch(err) {
    makeResponseException(res, err);
  }
}

module.exports = {
  getAppointmentsByMonth,
  getAppointmentResultsPDF
}