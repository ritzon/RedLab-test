const sTypeAgreement = require("../services/sTypeAgreement");
const { makeResponseOk, makeResponseException } = require("../global/response");

async function getAllTypeAgreement(req, res) {
  try {
    const typeAgreements = await sTypeAgreement.getAllTypeAgreement();
    makeResponseOk(res, {data: typeAgreements}, "global/masterAll");
  } catch(err) {
    makeResponseException(res, err);
  }
}

module.exports = {
	getAllTypeAgreement
}