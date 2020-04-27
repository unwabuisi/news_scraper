// Dependencies ===============================================================
var express = require("express");
var router = express.Router();
var cheerio = require("cheerio");
var axios = require("axios");
var db = require("../models");


// homepage
router.get('/', function (req, res) {
    res.render('index');
});

// saved articles page
router.get('/saved', function(req,res){

    db.Article.find({}).populate("notes").exec(function(err,articles){
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send(articles);
        }
    });

});

// handle favicon
router.get('/favicon.ico', function(req,res){
    res.sendStatus(204);
});

module.exports = router;