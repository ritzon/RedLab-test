const sRegion = require("../services/sRegion"),
	{makeResponseOk, makeResponseException} = require("../global/response");


async function getRegions(req,res) {
	try{
		let regions = await sRegion.getRegionsAll()
		makeResponseOk(res, {data:regions}, "global/masterAll")
	}catch(err){
		makeResponseException(res,err)
	}
}

async function getProvincesForRegion(req,res) {
	try{
	    let id = req.params.id
		let provinces = await sRegion.getProvincesForRegion(id)
		makeResponseOk(res, {data:provinces}, "global/masterAll")
	}catch(err){
		makeResponseException(res,err)
	}
}


module.exports = {
	getRegions,
	getProvincesForRegion,
}
