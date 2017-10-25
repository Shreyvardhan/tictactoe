$("div.custom span").click(function() {
	$("div.select").css("display", "block");
});

$("div.option").click(function() {
	$("div.option").removeClass("selected");
	$(this).addClass("selected");
	$("div.select").hide();
	$("div.custom span").html($("div.selected").html());
});

$("div.button").click(function(e) {
    e.preventDefault();
    // $("div.button").attr("data-navigate", attr);
    
    $("section.outer").css("transition", "opacity 0.5s");
    $("section.outer").css("opacity", 0);
    setTimeout(function() {
        $("body").css("background", "#14bdac");
        $("section.outer").css("opacity", 1);
        $('section.outer div.wrap').hide();
        $('section.outer div.wrap').css("display", "none");
        $("a.bth").css("display", "block");
        $('section.outer div.play').css({
            display: "block",
            opacity: 1,
            transition: "opacity 0.5s"
        });
    }, 500);

    var attr;
    var selected = $("div.selected").text();
    if (selected == "friend") {
        attr = "multiplayer";
        playFriend();
    } else if (selected == "computer") {
        attr = selected;
        playComputer();
    }
    $("div.play").attr("id", attr);

});

// $("a.bth").click(function() {
//     $("section.outer").css("transition", "opacity 0.5s");
//     $("section.outer").css("opacity", 0);
//     setTimeout(function() {
//         $("body").css("background", "#216be6");
//         $("section.outer").css("opacity", 1);
//         $('section.outer div.play').hide();
//         $('section.outer div.play').css("display", "none");
//         $('section.outer div.wrap').show();
//         $("a.bth").css("display", "none");
//         $('section.outer div.wrap').css({
//             display: "block",
//             opacity: 1,
//             transition: "opacity 0.5s"
//         });
//     }, 500);
// });


$(document).mouseup(function(e) {
    
    var container = $("div.select");
    
    if (!container.is(e.target)
        //if target of click isn't container
        && container.has(e.target).length === 0
        //nor a descendant of the container
    ) {
        
        //do something
        container.hide(); //for example
        
    }
    
});

