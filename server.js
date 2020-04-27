// Dependencies ==============================================================
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Express web server set up =================================================
var express = require('express');
var exphbs = require("express-handlebars");
var app = express();
var PORT = process.env.PORT || 3000;

// Initialize Express and routes
var routes = require("./routes/index");
var apiRoutes = require("./routes/apiRoutes");
app.use("/", routes);
app.use("/api", apiRoutes);

// Use morgan and body parser with our app
// app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Express Web Server listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

// MongoDB & Mongoose set up ==================================================
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/newsScraper", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var connection = mongoose.connection;

// Show any mongoose errors
connection.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
connection.once("open", function() {
  console.log("Mongoose connection successful.");
});

var db = require("./models");

