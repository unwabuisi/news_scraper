

// When button "Scrape New Articles" is clicked, send ajax api request for articles
$("#scrape").on("click", function(){
    $("#articleContainer").empty();

    $.get("/api/scrape", function(articles){

        console.log(articles);
        var len = articles.length;

        articles.forEach(function(item, i) {
            var el = `
            <h4><a href="${item.link}">${item.title}</a></h4>
            <p>Link:    <a href="${item.link}">${item.link}</a></p>
            <p>Comments:    <a href="${item.comments}">${item.comments}</a></p>
            <button type="button" name="button" class="topComment" data-cmt="${item.comments.substr(37)}">See Top Comment</button>
            <button type="button" name="button">Save Article</button>
            <hr>
            `;
            $("#articleContainer").append(el);
        });

    });
});
