var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');
const {url, port} = require("../config");

const urlLogo = `${url}:${port}/public/imgs/logo/logo-redlab.png`

var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

var transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  auth: {
    user: 'ethereumignus@gmail.com',
    pass: 'uvurhmrmvkpeywow'
  }
});
// Example
/*
var mailOptions = {
  from: 'ethereumignus@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};
*/

const mailOptions = {
  from: 'ethereumignus@gmail.com',
  subject: 'Bienvenido!'
}


function sendPassword(mailData) {
  readHTMLFile(__dirname + '/email.html', function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
     fullname: mailData.fullname,
     password:  mailData.password,
     urlLogo
    };

    var htmlToSend = template(replacements);

    mailOptions.to = mailData.email;
    mailOptions.html = htmlToSend;
    sendEmail(mailOptions);
  });
}

function sendTokenForPassword(mailData) {
  readHTMLFile(__dirname + '/reset.html', function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
     url:  mailData.url,
     urlLogo
    };

    var htmlToSend = template(replacements);

    mailOptions.to = mailData.email;
    mailOptions.html = htmlToSend;
    sendEmail(mailOptions);
  });
}

function sendContactRespond(mailData) {
  readHTMLFile(__dirname + '/contact.html', function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
     message:  mailData.message
    };

    var htmlToSend = template(replacements);

    mailOptions.to = mailData.email;
    mailOptions.subject = "Soporte - INMOBILIARIUM";
    mailOptions.html = htmlToSend;
    sendEmail(mailOptions);
  });
}

function sendIncidenceRespond(mailData) {
  readHTMLFile(__dirname + '/incidence.html', function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
     message:  mailData.message,
     decision:  mailData.decision
    };

    var htmlToSend = template(replacements);

    mailOptions.to = mailData.email;
    mailOptions.subject = "Soporte - INMOBILIARIUM";
    mailOptions.html = htmlToSend;
    sendEmail(mailOptions);
  });
}

function sendNewNotification(mailData) {
  readHTMLFile(__dirname + '/notification.html', function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
     name:  mailData.name,
     text:  mailData.text,
     urlImage: mailData.urlImage,
    };

    var htmlToSend = template(replacements);

    mailOptions.to = mailData.email;
    mailOptions.subject = "Notificación - INMOBILIARIUM";
    mailOptions.html = htmlToSend;
    sendEmail(mailOptions);
  });
}

function sendEmail(mailOptions) {
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function sendProperty(mailData) {
  readHTMLFile(__dirname + '/property.html', function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
      fullname: mailData.fullname,
      urlImage: mailData.urlImage,
      typeProperty: mailData.typeProperty,
      typeService: mailData.typeService,
      state: mailData.state,
      municipality: mailData.municipality,
      parish: mailData.parish,
      ubication: mailData.ubication,
      propertyId: mailData.propertyId,
      percent: mailData.percent
    };

    var htmlToSend = template(replacements);

    mailOptions.to = mailData.email;
    mailOptions.subject = "Notificación - INMOBILIARIUM";
    mailOptions.html = htmlToSend;
    sendEmail(mailOptions);
  });
}

module.exports = {
  sendEmail,
  sendPassword,
  sendTokenForPassword,
  sendContactRespond,
  sendNewNotification,
  sendProperty,
  sendIncidenceRespond
}