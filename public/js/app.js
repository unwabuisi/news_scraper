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
                <div id=article_${i}>
                    <h4><a href="${item.link}">${item.title}</a></h4>
                    <p>Link:    <a href="${item.link}">${item.link}</a></p>
                    <p>Comments:    <a href="${item.comments}">${item.comments}</a></p>
                    <button type="button" name="button" class="topCommentbtn" id="${item.comments.substr(37)}" data-cmt="${item.comments.substr(37)}">See Top Comment</button>
                    <button type="button" name="button" class="saveArticlebtn" >Save Article</button>
                </div>
                <hr>
                `;
                $("#articleContainer").append(el);
            });

        }).done(function(data){}).fail(function(error){});
    });

    // uses an event delegator on the container for the new topcomment button class
    $("#articleContainer").on("click", ".topCommentbtn" , function(){
        var parentNode = $(this);
        var commentsPageID = $(this).data("cmt");

        $.get("/api/scrape/"+commentsPageID, function(data){
            //removes reply div from returned html
            var topcmt = data.split(`<div class="reply">`)[0];

            // prepends the top comment text/html above this "see top comment" button
            parentNode.before("<p>" + topcmt + "</p>");

        }).done(function(data){}).fail(function(error){});

    });

    // uses event delegator on container for new saveArticle button class
    // Also handles sending data to api backend for db insert
    $("#articleContainer").on("click", ".saveArticlebtn", function(){
        var parentNode = $(this).parent();
        var currentNode = $(this);
        var fullDivContents = parentNode.contents();
        var articleID = parentNode.attr("id");


        var link = $(fullDivContents[3]).children().attr("href");
        var title =  $(fullDivContents[1]).text();
        var cmtslink = $(fullDivContents[5]).children().attr("href");



        var data = {
            title: title,
            link: link,
            cmtslink: cmtslink
        };


        $.ajax({
            url:"/api/articles",
            type: "POST",
            data: data
        }).done(function(response){
            $(fullDivContents[9]).prop("disabled",true);
            currentNode.text("Saved");
        }).fail(function(error){
            console.log(error);
        });


    });

});