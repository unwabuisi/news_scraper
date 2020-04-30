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
        console.log(form);
        console.log(form[0].elements[0]);
        // var textarea = form.elements["notes"].value;

        // console.log();
    });


});