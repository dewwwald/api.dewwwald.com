var express = require('express');

var app = express();

var port = 8080;

app.get("/", function (request, response) {
	response.send('My website api root');
});

app.get("/mail/contact", function (request, response) {
	response.send('Foo bar');
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
