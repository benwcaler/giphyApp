window.onload = function () {
    //variables
    var topics = ["Harry Potter", "Hermione Granger", "Ronald Weasley", "Severus Snape", "Albus Dumbledore", "Rubeus Hagrid", "Sirius Black", "Tom Riddle", "Minerva McGonagall", "Bellatrix Lestrange"];
    //api calls
    $(document).on("click", "#btn", function () {
        $("#gifs").empty();
        var sTerm = $(this).val();
        var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=B2biiO4oVNMtT2qJ2fAMgpgB5RgiuvS1&q=" + sTerm + "&limit=10&offset=0&rating=PG&lang=en";
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            var gifSrc = response.data;
            for (var i = 0; i < gifSrc.length; i++) {
                var div = $("<div>");
                var img = $("<img>");
                img.attr("src", gifSrc[i].images.fixed_height_still.url);
                img.attr("data-still", gifSrc[i].images.fixed_height_still.url);
                img.attr("data-animate", gifSrc[i].images.fixed_height.url);
                img.attr("data-state", "still");
                img.addClass("gif");
                div.addClass("gifdiv")
                div.append(img)
                div.append("<p>" + "Rating: " + gifSrc[i].rating + "</p>");
                $("#gifs").append(div);
            }
        })
    })
    //make the buttons
    function btnLoad() {
        $("#click").empty()
        for (var i = 0; i < topics.length; i++) {
            var btn = $("<button>");
            btn.text(topics[i]).attr("id", "btn");
            btn.attr("value", topics[i])
            $("#click").append(btn)
        }
    }
    btnLoad()
    //animate images
    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate")
        } else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })
    //add button function
    $("#searchbtn").on("click", function (event) {
        event.preventDefault();
        $("#error").empty();
        var dup;
        var dup2;
        for (var i = 0; i < topics.length; i++) {
            if (topics[i].toLowerCase().includes($("#term").val().toLowerCase())) {
                $("#error").text("Already a button");
                dup = topics[i].toLowerCase();
                dup2 = $("#term").val().toLowerCase()
            }
        }
        if ($("#term").val() === "") {
            $("#error").text("Please enter a search term");
        } else if (dup !== $("#term").val().toLowerCase() && dup2 !== $("#term").val().toLowerCase()) {
            topics.push($("#term").val())
            btnLoad()
        }
        $("#term").val("")
    })
}