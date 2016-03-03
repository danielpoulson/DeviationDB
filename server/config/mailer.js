var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var connection = require('../utilities/connection');
var path = require('path');
var rootPath = path.normalize(__dirname);
var fs = require('fs');

exports.sendMail = function(toEmail, emailType, emailActivity) {
  var emailSubject = "You have been assigned ownership of a " + emailType;

  var auth = {
    auth: connection.mailgun()
  }

  var nodemailerMailgun = nodemailer.createTransport(mg(auth));

  fs.readFile(rootPath + '/mail.html', 'utf8', function(err, html){
      if (err) {
        console.log('Error: ' + err);
      }
    var html = `<html><body STYLE="font-size: 12pt/14pt; font-family:sans-serif">
      <h3>You have been assigned ownership of this ${emailType}</h3></br> ${emailActivity} </br> ${html} </body></html>`;
    
    nodemailerMailgun.sendMail({
        from: 'devaitions@fmc.com',
        to: toEmail, // An array if you have multiple recipients.
        subject: emailSubject,
        //You can use "html:" to send HTML email content. It's magic!
        html: html,
      },
      function (err, info) {
      if (err) {
        console.log('Error: ' + err);
      }
      else {
        console.log('Request:' + info);
      }
    });
  });


};
