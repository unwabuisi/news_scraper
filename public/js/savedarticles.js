$(document).ready(function(){

    $(".articleNotesbtn").on("click", function(){
        var articleID = $(this).data("articleid");
        var parentNode = $(this).parent();

        $.get("/api/all/"+articleID, function(data){
            console.log(data.notes);
        });

        // show text area to add notes
        parentNode.find("form").show();
        // parentNode.children().find("textarea").show();
    });

    $(".noteSubmit").on("submit", function(e){
        e.preventDefault();
        var form = $(this);
        var noteText = form[0].elements[0].value;
        var articleID = form[0].elements[1].value;
        var note = {
            textBody:noteText
        };
        // console.log(noteText);
        // console.log(articleID);

        $.ajax({
            type: "POST",
            url: "/api/notes",
            data: note,
            success: function(noteObject){

                //noteObject returns as an object with the inserted Note ID and body
                console.log(noteObject);

                var note_id = {
                    noteID:noteObject._id
                };

                $.ajax({
                    type:"POST",
                    url: "/api/articles/"+articleID,
                    data: note_id,
                    success: function(response){
                        console.log(response);
                    }
                });
            }
        });

    });


});