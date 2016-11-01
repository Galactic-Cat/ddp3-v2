/* global $*/

var del = 300;
//var dataset = null;

var getData = function getData(dset,callback) {
    $.ajax({
        type: "GET",
        url: 'https://ddp3-cloned-mastergrid.c9users.io/site/php/get'+ dset +'.php',
        data: '',
        dataType: "html",
        success: function(data) {
            //alert(data);
            var array = JSON.parse(data);
            callback(array);
        },
        error: function() {
            alert('Error occured. Zorg ervoor dat je webadres met https:// begint!');
        }
    });
};

var refresh = function refresh() {
    var step = 0;
    getData(1, function(inp) {
        $("#numTests").html(inp[0]);
        $("#numSwitch").html(inp[1] + " (" + Math.floor(inp[1] / inp[0] * 100) + "% van testen)");
        $("#numSwiWin").html(inp[2] + " (" + Math.floor(inp[2] / inp[1] * 100) + "% van aantal gewisseld)");
        $("#numStiWin").html(inp[3] + " (" + Math.floor(inp[3] / (inp[0] - inp[1]) * 100) + "% van aantal niet gewisseld)");
        step = step + 1;
    });
    getData(2, function(inp) {
        //inp = [6,5,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
        for(var i = 3; i <= 8; i++) {
            $(".klas" + i).css("width",Math.floor(inp[i] / inp[0] * 100) + "%");
        }
        for(var i = 9; i <= 13; i++) {
            $(".klas" + i).css("width",Math.floor(inp[i] / inp[1] * 100) + "%");
        }
        for(var i = 14; i <= 17; i++) {
            $(".klas" + i).css("width",Math.floor(inp[i] / inp[2] * 100) + "%");
        }
        $("#vwoTests").html(inp[0]);
        $("#havoTests").html(inp[1]);
        $("#vmboTests").html(inp[2]);
        step = step + 1;
    });
    getData(3, function(inp) {
        var inp1 = inp[0];
        $(".switchers").text(inp1[0]);
        $(".stickers").text(inp1[1]);
        for (var i = 2; i <= 5; i++) {
            $(".whys" + i).css("width",Math.floor(inp1[i] / inp1[0] * 100) + "%").text("("+inp1[i]+")");
        }
        for (var i = 6; i <= 9; i++) {
            $(".whys" + i).css("width",Math.floor(inp1[i] / inp1[1] * 100) + "%").text("("+inp1[i]+")");
        }
        var inp2 = inp[1];
        for (var i = 0; i <= inp2.length-1; i++) {
            $(".whySwitch").prepend("<p>" + inp2[i] + "<p>" + "<hr>");
        }
        var inp3 = inp[2];
        for (var i = 0; i <= inp3.length-1; i++) {
            $(".whyStick").prepend("<p>" + inp3[i] + "<p>" + "<hr>");
        }
        $(".whySwitch").children("hr:last-child").hide();
        $(".whyStick").children("hr:last-child").hide();
        step = step + 1
    });
    $(".loadDone").slideDown(del);
};

var jinx = function jinx() {
    $(".numbers").click(function() {
        if (!($(this).hasClass("active"))) {
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            $("#nivs").slideUp(del);
            $("#guide").slideUp(del);
            $("#whys").slideUp(del).delay(del);
            $("#numbers").slideDown(del);
        }
    });
    $(".nivs").click(function() {
        if (!($(this).hasClass("active"))) {
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            $("#numbers").slideUp(del);
            $("#guide").slideUp(del);
            $("#whys").slideUp(del).delay(del);
            $("#nivs").slideDown(del);
        }
    });
    $(".whys").click(function() {
        if (!($(this).hasClass("active"))) {
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            $("#numbers").slideUp(del);
            $("#guide").slideUp(del);
            $("#nivs").slideUp(del).delay(del);
            $("#whys").slideDown(del);
        }
    });
    $(".guide").click(function() {
        if (!($(this).hasClass("active"))) {
            $(this).addClass("active");
            $("li").removeClass("active");
            $("#numbers").slideUp(del);
            $("#nivs").slideUp(del);
            $("#whys").slideUp(del).delay(del);
            $("#guide").slideDown(del);
        }
    });
    $(".butwhatif").click(function() {
        if ($(this).hasClass("coll")) {
            $(this).text("Terug naar 3 deuren");
            $(this).removeClass("coll").addClass("expa");
        } else if ($(this).hasClass("expa")) {
            $(this).text("Maar wat als ik nu meer dan drie deuren heb?");
            $(this).removeClass("expa").addClass("coll");
        }
        $(".guide1").slideToggle(del);
        $(".guide2").slideToggle(del).delay(del);
    });
    $(".refresh").click(function() {
        $(".loadDone").children("strong").text("Gegevens succesvol herladen.");
        refresh();
    });
    $(".loadDone").children("a").click(function() {
        $(".loadDone").slideUp(del);
    });
    $.keyDown(function() {
        if (event.which == 17) {
            $.keyUp()
        }
    })
};

$(document).ready(function() {
    $(".noQuery").hide();
    refresh();
    jinx();
});