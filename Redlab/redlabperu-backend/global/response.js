const makeTemplate = require("../templates");
const messages = require("../config/properties/messages")

function makeResponseOk(res,data,pathTemplate){
    let json = makeTemplate(data,pathTemplate);
    res.status(200).json(json);
}

function makeResponseOkMessage(res, code) {
    let message = {code: code, text: messages[[code]]}
    let json = makeTemplate({message},'global/responseOkMessage');
    res.status(200).json(json);
}

function makeResponseException(res,error){
    if(!error.hasOwnProperty('code')) //If error has no code, i.e. it's a generic exception
        error.code = "E000";
    let json = makeTemplate({error},'global/responseException');
    res.status(200).json(json);
    /*
        Status should be 400 (bad request), for some reason in Angular http 
        provider receives the response body in other format in 200 and 400
    */
}

module.exports = {
    makeResponseException,
    makeResponseOkMessage,
    makeResponseOk
}