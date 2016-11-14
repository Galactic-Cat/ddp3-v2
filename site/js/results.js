/* global $ firebase*/

var del = 300;
var database = firebase.database();
//var dataset = null;

var getData = function getData(dset,callback) {
    if (dset == 1) {
        var countTest = 0;
        var countSwitch = 0;
        var countSwitchWin = 0;
        var countStickWin = 0;
        database.ref('results').once('value', function(snapshot) {
            snapshot.forEach(function(child) {
                var perform = child.val();
                if (perform.why != -1) {
                    countTest = countTest + 1;
                    if (perform.switch == 1) {
                        countSwitch++;
                        if (perform.win == 1) {
                            countSwitchWin++;
                        }
                    } else {
                        if (perform.win == 1) {
                            countStickWin++;
                        }
                    }
                }
            });
            callback([countTest, countSwitch, countSwitchWin, countStickWin]);
        });
    } else if (dset == 2) {
        var vwoTests, havoTests, vmboTests, vwo1Tests, vwo2Tests, vwo3Tests, vwo4Tests, vwo5Tests, vwo6Tests, havo1Tests, havo2Tests, havo3Tests, havo4Tests, havo5Tests, vmbo1Tests, vmbo2Tests, vmbo3Tests, vmbo4Tests;
        vwoTests = vwo1Tests = vwo2Tests = vwo3Tests = vwo4Tests = vwo5Tests = vwo6Tests = havoTests = havo1Tests = havo2Tests = havo3Tests = havo4Tests = havo5Tests = vmboTests = vmbo1Tests = vmbo2Tests = vmbo3Tests = vmbo4Tests = 0;
        database.ref('results').once('value', function(snapshot) {
            snapshot.forEach(function(child) {
                var perform = child.val();
                if (perform.why != -1) {
                    if (perform.niveau == 1) {
                        vmboTests++;
                        eval("vmbo" + perform.jaar + "Tests++;");
                    } else if (perform.niveau == 2) {
                        havoTests++;
                        eval("havo" + perform.jaar + "Tests++;");
                    } else if (perform.niveau == 3) {
                        vwoTests++;
                        eval("vwo" + perform.jaar + "Tests++;");
                    }
                }
            });
            callback([vwoTests, havoTests, vmboTests, vwo1Tests, vwo2Tests, vwo3Tests, vwo4Tests, vwo5Tests, vwo6Tests, havo1Tests, havo2Tests, havo3Tests, havo4Tests, havo5Tests, vmbo1Tests, vmbo2Tests, vmbo3Tests, vmbo4Tests]);
        });
    } else if (dset == 3) {
        var numSwitch, numStick, numSwitch1, numSwitch2, numSwitch3, numSwitch4, numStick1, numStick2, numStick3, numStick4, switchWhy, stickWhy;
        numSwitch = numStick = numSwitch1 = numSwitch2 = numSwitch3 = numSwitch4 = numStick1 = numStick2 = numStick3 = numStick4 = 0;
        switchWhy = [];
        stickWhy = [];
        database.ref('results').once('value', function(snapshot) {
            snapshot.forEach(function(child) {
                var perform = child.val();
                if (perform.why != -1) {
                    if (perform.switch == 1) {
                        numSwitch++;
                        eval("numSwitch" + perform.why + "++;");
                        if (perform.why == 4) {
                            switchWhy.unshift(perform.why2);
                        }
                    } else if (perform.switch == 0) {
                        numStick++;
                        eval("numStick" + perform.why + "++;");
                        if (perform.why == 4) {
                            stickWhy.unshift(perform.why2);
                        }
                    }
                }
            });
            callback([numSwitch, numStick, numSwitch1, numSwitch2, numSwitch3, numSwitch4, numStick1, numStick2, numStick3, numStick4, switchWhy, stickWhy]);
        });
    }
};

var refresh = function refresh() {
    var step = 0;
    $(".why2").children().remove();
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
        //var inp1 = inp[0];
        $(".switchers").text(inp[0]);
        $(".stickers").text(inp[1]);
        for (var i = 2; i <= 5; i++) {
            $(".whys" + i).css("width",Math.floor(inp[i] / inp[0] * 100) + "%").text("("+inp[i]+")");
        }
        for (var i = 6; i <= 9; i++) {
            $(".whys" + i).css("width",Math.floor(inp[i] / inp[1] * 100) + "%").text("("+inp[i]+")");
        }
        for (var i = 0; i < inp[10].length; i++) {
            $(".whySwitch").prepend("<p>" + inp[10][i] + "<p>" + "<hr>");
        }
        for (var i = 0; i < inp[11].length; i++) {
            $(".whyStick").prepend("<p>" + inp[11][i] + "<p>" + "<hr>");
        }
        $(".whySwitch").children("hr:last-child").hide();
        $(".whyStick").children("hr:last-child").hide();
        step = step + 1;
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
    /*$.keyDown(function() {
        if (event.which == 17) {
            $.keyUp()
        }
    })*/
};

$(document).ready(function() {
    $(".noQuery").hide();
    refresh();
    jinx();
});