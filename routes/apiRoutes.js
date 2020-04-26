var express = require("express");
var router = express.Router();

router.get("/", function(req,res){
    console.log("api route");
    res.json({route:true});
});

module.exports = router;