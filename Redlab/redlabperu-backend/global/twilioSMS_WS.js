// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = 'ACd374f6e303acddd89d3aaade5ae82519';
const authToken = '266f7b7ce6aed15c573d59ad65f31e70';
const client = require('twilio')(accountSid, authToken);

function sendSMS(number, body) {
    client.messages
        .create({
            body:`-
${body}`,
            from: '+18143035753',
            to: number
        })
        .then(message => console.log(message.sid))
        .done();
}


function sendWS(number, body) {
    client.messages
        .create({
            body,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${number}`
        })
        .then(message => console.log(message.sid))
        .done();
}

module.exports = {
    sendWS,
    sendSMS
}
