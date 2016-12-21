var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

var ContactMail = Object.create({});
// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
var auth = {
  auth: {
    api_key: 'key-9bf8a41c3c0ba77b33fff468e15a0bf1',
    domain: 'mg.dewwwald.com'
  }
}

ContactMail.__proto__.send = function (message) 
{
  var nodemailerMailgun = nodemailer.createTransport(mg(auth));
  nodemailerMailgun.sendMail({
    from: 'noreply@dewwwald.com',
    to: 'me@dewwwald.com',
    subject: 'Contact form submition',
    html: message
  }, function (err, info) {
    if (err) {
      console.log('Error: ' + err);
    }
    else {
      console.log('Response: ' + info);
    }
  });
}

module.exports = ContactMail;