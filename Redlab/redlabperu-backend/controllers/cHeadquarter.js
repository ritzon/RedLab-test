const sHeadquarter = require("../services/sHeadquarter"),
	{ makeResponseOk, makeResponseException, makeResponseOkMessage } = require("../global/response");
	const { getFirstPropertyOfObject } = require("../global/helpers");

async function getAllHeadquarter(req, res) {
  try {
    const headquarters = await sHeadquarter.getAllHeadquarter();
    makeResponseOk(res, {data: headquarters}, "headquarter/listHeadquarter");	
  } catch(err) {
    makeResponseException(res, err);
  }
}

async function getHeadquarter(req, res) {
	try {
		const id = req.params.id;
		const headquarter = await sHeadquarter.getHeadquarter(id);
		makeResponseOk(res, {headquarter}, "headquarter/getHeadquarter");
	} catch(err) {
		makeResponseException(res, err);
	}
}

async function updateHeadquarter(req, res) {
	try {
		let data = JSON.parse(getFirstPropertyOfObject(req.fields));
		let image = getFirstPropertyOfObject(req.files);
		let id = req.params.id;
		await sHeadquarter.updateHeadquarter(id, data, image);
		makeResponseOkMessage(res, 'I046');
	} catch(err) {
		makeResponseException(res, err);
	}
}

async function createHeadquarter(req, res) {
	try {
		let image = getFirstPropertyOfObject(req.files);
		console.log(req.files)
		let data = JSON.parse(getFirstPropertyOfObject(req.fields));
		await sHeadquarter.createHeadquarter(data, image);
		makeResponseOkMessage(res, 'I048');
	} catch(err) {
		makeResponseException(res, err);
	}
}

module.exports = {
  getAllHeadquarter,
  getHeadquarter,
  updateHeadquarter,
  createHeadquarter
}