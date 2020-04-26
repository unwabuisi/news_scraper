var cheerio = require("cheerio");
var axios = require("axios");
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/newsScraper",  { useNewUrlParser: true, useUnifiedTopology: true });
var connection = mongoose.connection;
var db = require("./models");


// Show any mongoose errors
connection.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
connection.once("open", function() {
  console.log("Mongoose connection successful.");
});

