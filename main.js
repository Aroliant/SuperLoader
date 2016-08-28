var socket = io("https://superloader.herokuapp.com");

$("#keyword").bind('input', function() {
    socket.emit("keyword", this.value);
    $("#keyword-nm").val(this.value);
    AJAXSearch(this.value);
});

$("#keyword-nm").bind('input', function() {
    socket.emit("keyword", this.value);
    $("#keyword").val(this.value);
    AJAXSearch(this.value);
});


function AJAXSearch(keyword) {
    $.ajax({
        url: "https://superloader-php.herokuapp.com/?keyword=" + keyword,
        method : "GET"
    }).done(function(results) {

    results = JSON.parse(results);

    var HTML = "<ul>";

    for (var i = 0; i < results.length; i++) {

        HTML += "<li>" + results[i] + "</li>";

    }

    HTML += "</ul>";

    results_normal.innerHTML = HTML;
        
    });
}



socket.on("result", function(results) {

    results = JSON.parse(results);

    var HTML = "<ul>";

    for (var i = 0; i < results.length; i++) {

        HTML += "<li>" + results[i] + "</li>";

    }

    HTML += "</ul>";

    results_sl.innerHTML = HTML;


});
