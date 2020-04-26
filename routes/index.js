var express = require("express");
var router = express.Router();

// homepage
router.get('/', function (req, res) {
  res.render('index');
});

// handle favicon
router.get('/favicon.ico', function(req,res){
    res.sendStatus(204);
});

module.exports = router;