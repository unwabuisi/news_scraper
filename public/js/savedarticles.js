$(document).ready(function(){

    // this re-usable function lists the notes in the appropriate div respective to article
    function noteLister(articleID, notesDiv) {
        $.get("/api/all/"+articleID, function(data){

        }).done(function(response){

            notesDiv.empty();
            response.notes.forEach(function(item, i) {
                notesDiv.append(`${item.body} \t\t<button type="button" class="noteDeletebtn" data-noteid="${item._id}">X</button><br>`);
            });
        });
    }

    // lists the notes associated with the artcile and unhides the hidden div
    $(".articleNotesbtn").on("click", function(){
        var articleID = $(this).data("articleid");
        var parentNode = $(this).parent();
        var noteDiv = $("#notelist_"+articleID);

        noteLister(articleID,noteDiv);

        // show text area to add notes
        parentNode.find("form").show();

    });

    // sends note text to database and refreshes / updates the notes div to show latest note
    $(".noteSubmit").on("submit", function(e){
        e.preventDefault();
        var form = $(this);
        var noteText = form[0].elements[0].value;
        var noteTextDiv = form[0].elements[0];
        var articleID = form[0].elements[1].value;
        var noteDiv = $("#notelist_"+articleID);
        var note = {
            textBody:noteText
        };

        console.log($(this).children().first());


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
                        noteLister(articleID,noteDiv);
                        //reset textarea
                        $(this).children().first().val("");
                        console.log(response);
                    }
                });
            }
        });

    });

    $("#clear").on("click", function(){

    });
});