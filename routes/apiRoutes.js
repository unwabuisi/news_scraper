// Dependencies ===============================================================
var express = require("express");
var router = express.Router();
var cheerio = require("cheerio");
var axios = require("axios");
var db = require("../models");


router.get("/scrape", function(req,res){
    axios.get("https://news.ycombinator.com/over?points=100").then(function(html){
        var completelisting = [];
        var hnresults = [];
        var commentURIList = [];

        // load the html received into cheerio, saving it to the '$' selector command
        var $ = cheerio.load(html.data);

        // pull the title and link of every post on this hackernews page
        $('tr').each(function(i, element){
            var link = $(element,".athing").children().find(".storylink").attr("href");
            var title = $(element,".athing").children().find(".storylink").text();

            // not all the tr elements have the appropriate structure and
            // contain the element we're looking for
            if ((link !== undefined) && (title !== undefined)) {
                // this is the div below the title / link
                var subDiv = $(element,".athing").children().find(".subtext");

                // you have to visit each subdiv in each tr element to get the links out
                subDiv.each(function(j, secondElement){
                    var commentURI = $(secondElement).children().last().attr("href");
                    // since it is going through every element in the subtext class
                    // make sure that it doesn't add each element to the array, only
                    // the elements with links
                    if (commentURI.length > 1) {
                        commentURIList.push(commentURI);
                    }

                });

                // Save these results in an object to push into the result array defined earlier
                hnresults.push({
                    title: title,
                    link: link
                });
            }
        });

        // removes the first listing in the hnresults list because of a duplicate error
        hnresults = hnresults.slice(1);

        // this combines the hnresults array and commentURI array into a final array
        hnresults.forEach(function(item, i) {
            completelisting.push({
                title: item.title,
                link: item.link,
                comments: "https://news.ycombinator.com/"+commentURIList[i]
            });
        });

        res.status(200).json(completelisting);
    });
});

router.get("/scrape/:commentsPageID", function(req,res){
    var commentsPageID = req.params.commentsPageID.toString();

    axios.get("https://news.ycombinator.com/item?id="+commentsPageID).then(function(html){
        var $ = cheerio.load(html.data);
        var topComment = $(".comment").children().first().html();
        res.status(200).send(topComment);
    });
});

router.get("/all", function(req,res){
    db.Article.find({}).populate("notes").lean().exec(function(err,articles){
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).json(articles).end();
        }
    });
});

router.get("/all/:articleid", function(req,res){
    db.Article.findById({_id:req.params.articleid}).populate("notes").exec(function(err,article){
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).json(article).end();
        }
    });
});

router.get("/articles", function(req,res){

    db.Article.find({}).then(function(articles){
        res.status(200).json(articles).end();
    }).catch(function(err){
        res.status(500).send(err);
    });
});
router.post("/articles", function(req,res){

    // creates new article instance / object
    var savedArticle = new db.Article({
        title: req.body.title,
        link: req.body.link,
        comments: req.body.cmtslink
    });

    // sends article instance to the database
    savedArticle.save().then(function(resp){
        res.status(200).end();
    }).catch(function(err){
        res.status(500).send(err);
        console.log(err);
    });


});
router.post("/articles/exist", function(req,res){

    // search database for title of article and return true / false value based on whether it is in DB or not
    db.Article.findOne({title:req.body.title}).then(function(response){
        if (response == null) {
            res.status(200).send(false).end();
        }
        else {
            res.status(200).send(true).end();
        }

    }).catch(function(err){
        res.status(500).send(err).end();
    });

});
router.post("/articles/:articleid", function(req,res){

    // add note id to article's notes array
    db.Article.updateOne({_id:req.params.articleid},{
        $push: {
            notes: req.body.noteID
        }
    }).then(function(response){

        res.status(200).json(response);

    }).catch(function(err){

        res.status(500).send(err);
    });



});
router.delete("/articles", function(req,res){
    db.Article.deleteMany({},function(response){
    });
    db.Note.deleteMany({}, function(response){
    });
    res.status(200).end();
});

router.get("/notes", function(req,res){
    db.Note.find({}).then(function(notes){
        res.status(200).json(notes).end();
    }).catch(function(err){
        res.status(500).send(err);
    });
});
router.post("/notes", function(req,res){

    // creates new note instance / object
    var savedNote = new db.Note({
        body: req.body.textBody
    });

    // sends note instance to the database
    savedNote.save().then(function(resp){
        res.status(200).send(resp).end();
    }).catch(function(err){
        res.status(500).send(err);
        console.log(err);
    });
});
router.delete("/notes/:noteid", function(req,res){
    db.Note.deleteOne({
        _id:req.params.noteid
    }).then(function(response){
        res.status(200).send(response).end();
    }).catch(function(err){
        res.status(500).send(err);
    });
});


module.exports = router;