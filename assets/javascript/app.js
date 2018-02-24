window.onload = function () {
    //variables
    var sTerm ;
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=B2biiO4oVNMtT2qJ2fAMgpgB5RgiuvS1&q=" + sTerm + "&limit=10&offset=0&rating=G&lang=en";
    var buttons = ["Harry Potter", "Hermione Granger", "Ronald Weasley", "Severus Snape", "Albus Dumbledore", "Rubeus Hagrid", "Sirius Black", "He who shall not be named", "Minerva McGonagall", "Bellatrix Lestrange"];
    //api calls
    $(document).on("click", "#btn", function () {
        sTerm = $(this).attr("data-name");
        console.log(sTerm)
        console.log($(this).attr("data-name"));
        console.log(queryUrl)
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            var gifSrc = response;
            console.log(gifSrc)
        })
    })
    //make the buttons
    function btnLoad() {
        for (var i = 0; i < buttons.length; i++) {
            var btn = $("<button>");
            btn.text(buttons[i]).attr("id", "btn");
            btn.attr("data-name", buttons[i])
            $("#click").append(btn)
        }
    }
    btnLoad()

    //add button function

}