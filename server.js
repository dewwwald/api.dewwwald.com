const express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path"),
  regForFile = /.*\..*/,
  app = express(),
  port = 8080;

app.use(bodyParser.json());

app.post("/mail/contact", function (request, response) {
  var ContactMail = require("./mail/contact.js");
  var data = request.body;
  ContactMail.send(data.message);
  response.send("Email sent");
});

app.get("*", (req, res) => {
  if (regForFile.test(req.path)) {
    res.sendFile(path.resolve("public/dist/" + req.path).replace("//", "/"));
  } else {
    res.sendFile(path.resolve("public/dist/index.html"));
  }
});

app.listen(port, "127.0.0.1", function (err) {
  if (err) {
    throw new Error(err);
  } else {
    console.log("Running server on port " + port);
  }
});
