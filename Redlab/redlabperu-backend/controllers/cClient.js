const models = require("../models"),
  sClient = require("../services/sClient"),
	{ makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");

async function getClient(req, res) {
  try {
    const id = req.params.id;
    const client = await sClient.getClient(id);
    makeResponseOk(res, {client}, "client/getClient");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getClientByDOC(req, res) {
  try {
    const query = req.query;
    const client = await sClient.getClientByDOC(query);
    makeResponseOk(res, {client}, "client/getClient");
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getClientAll(req,res) {
  try {
    const range = req.query.range || '[0,9]'
    const [start, end] = JSON.parse(range)
    const limit = end - start + 1
    const query = req.query;
    let data = await sClient.getClientAll(start, limit, query);
    makeResponseOk(res, {data}, "client/listClients") 
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function updateClient(req, res) {
  try {
    const { fields } = req;
    await sClient.updateClient(req.params.user_id, fields);
    makeResponseOkMessage(res, 'I002');
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function destroyClient(req, res) {
  try {
    await sClient.destroyClient(req.params.user_id);
    makeResponseOkMessage(res, 'I004');
  } catch(err) {
    makeResponseException(res, err);
  }
}

module.exports = {
  getClient,
  getClientAll,
  getClientByDOC,
  updateClient,
  destroyClient
}