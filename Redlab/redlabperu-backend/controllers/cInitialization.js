const sInitialization = require("../services/sInitialization"),
    {makeResponseOk, makeResponseException, makeResponseOkMessage} = require("../global/response");

async function initialization(req,res) {
    try{
        await sInitialization.initialization()
        res.status(200).json({status:true,message:"todo ok"})
        makeResponseOkMessage(res, "I000");
    }catch(err){
        console.log(err)
        makeResponseException(res,err)
    }
}

module.exports = {
    initialization
}
