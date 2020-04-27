$(document).ready(function(){

    // When button "Scrape New Articles" is clicked, send ajax api request for articles
    $("#scrape").on("click", function(){
        $("#articleContainer").empty();

        $.get("/api/scrape", function(articles){

            console.log(articles);
            var len = articles.length;



            articles.forEach(function(item, i) {

                // this is for the ASK HN links
                if (item.link.indexOf("item?id=") == 0) {
                    item.link = item.comments;
                }

                var el = `
                <h4><a href="${item.link}">${item.title}</a></h4>
                <p>Link:    <a href="${item.link}">${item.link}</a></p>
                <p>Comments:    <a href="${item.comments}">${item.comments}</a></p>
                <button type="button" name="button" class="topCommentbtn" id="${item.comments.substr(37)}" data-cmt="${item.comments.substr(37)}">See Top Comment</button>
                <button type="button" name="button">Save Article</button>
                <hr>
                `;
                $("#articleContainer").append(el);
            });

        }).done(function(data){}).fail(function(error){});
    });

    // uses an event delegator on the container for the new topcomment button class
    $("#articleContainer").on("click", ".topCommentbtn" ,function(){
        var parentNode = $(this);
        var commentsPageID = $(this).data("cmt");

        $.get("/api/scrape/"+commentsPageID, function(data){
            //removes reply div from returned html
            var topcmt = data.split(`<div class="reply">`)[0];

            // prepends the top comment text/html above this "see top comment" button
            parentNode.before("<p>" + topcmt + "</p>");

        }).done(function(data){}).fail(function(error){});

    });

});