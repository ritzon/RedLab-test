const sProvince = require("../services/sProvince"),
	{makeResponseOk, makeResponseException} = require("../global/response");



async function getDistrictsForProvince(req,res) {
	try{
	    let id = req.params.id
		let districts = await sProvince.getDistrictsForProvince(id)
		makeResponseOk(res, {data:districts}, "global/masterAll")
	}catch(err){
		makeResponseException(res,err)
	}
}


module.exports = {
	getDistrictsForProvince,
}
