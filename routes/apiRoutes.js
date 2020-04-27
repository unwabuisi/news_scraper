// Dependencies ===============================================================
var express = require("express");
var router = express.Router();
var cheerio = require("cheerio");
var axios = require("axios");

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
        var hbsObject = {
            articles: completelisting
        };
        console.log(completelisting);
    });
});

module.exports = router;