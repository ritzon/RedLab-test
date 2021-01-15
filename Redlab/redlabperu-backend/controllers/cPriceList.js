const sPriceList = require("../services/sPriceList"),
	{ makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");
/*
async function getPagedService(req, res) {
  try {
    const range = req.query.range || '[0,9]'
    const [start, end] = JSON.parse(range)
    const limit = end - start + 1
    const specialities = await sPriceList.getPagedService(start, limit);
    makeResponseOk(res, {data: specialities}, "global/master");
  } catch(err) {
    makeResponseException(res, err);
  }
}
*/
async function getAllPriceList(req, res) {
  try {
    const query = req.query;
    const pricesList = await sPriceList.getAllPriceList(query);
    makeResponseOk(res, {pricesList}, "priceList/listPrices");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getPriceList(req,res) {
	try {
		let id = req.params.id;
		let priceList = await sPriceList.getPriceList(id);
		makeResponseOk(res, {priceList}, "priceList/getPriceList");
	} catch(err){
		makeResponseException(res,err);
	}
}

async function createPriceList(req, res) {
  try {
    await sPriceList.createPriceList(req.fields);
    makeResponseOkMessage(res, "I040");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updatePriceList(req, res) {
  try {
    let body = req.fields
    let id = req.params.id
    await sPriceList.updatePriceList(id, body);
    makeResponseOkMessage(res, "I042");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function deletePriceList(req, res) {
  try {
    let id = req.params.id
    await sPriceList.destroyPriceList(id);
    makeResponseOkMessage(res, "I044");
  } catch(err) {
    makeResponseException(res, err);
  }
}
  

module.exports = {
  getAllPriceList,
  getPriceList,
  createPriceList,
  updatePriceList,
  deletePriceList
}