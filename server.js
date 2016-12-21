var express = require('express'), 
	bodyParser = require('body-parser');

var app = express();

var port = 8080;

app.use(bodyParser.json());

app.get("/", function (request, response) {
	response.send('My website api root');
});

app.post("/mail/contact", function (request, response) {
	var ContactMail = require('./mail/contact.js');
	var data = request.body;
	ContactMail.send(data.message);
	response.send('Email sent');
});

app.listen(port, "127.0.0.1", function (err) {
	if (err) 
	{
		throw new Error(err);
	}
	else 
	{
		console.log('Running server on port ' + port);
	}
});
