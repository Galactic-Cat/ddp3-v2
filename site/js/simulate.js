/* global $ firebase*/

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var testcode = getUrlParameter("testcode");
var niv = getUrlParameter("niv");
var jaar = getUrlParameter("jaar");
var del = 300;
var mhi1 = null;
var clo = null;
var mhc = null;
var win = Math.floor(Math.random() * testcode) + 1;
var check = null;
var why2 = null;
var pick = true;
var database = firebase.database();
//var ress = "No result yet.";

var finish = function finish(nnn) {
    $(".mhp-numDeur").text(nnn);
    $(".mhp-numDeurA").text(nnn-2);
    $(".mhp-inp-first")
        .attr("placeholder", "1-"+nnn)
        .attr("max", nnn);
};

var testKlas = function testKlas(inp1, inp2) {
    if (inp2 < 1) {
        $("#noerror1").hide();
        $("#error1").show();
        $("#error1").children(".sub").text("error code: 3");
        return false;
    }
    if ((inp2 > 4 && inp1 == "vmbo")||(inp2 > 5 && inp1 == "havo")||(inp2 > 6 && inp1 == "vwo")) {
        $("#noerror1").hide();
        $("#error1").show();
        $("#error1").children(".sub").text("error code: 4");
        return false;
    }
    return true;
};

var saveAll = function saveAll() {
    if (mhi1==win) {
        win = 1;
    } else {
        win = 0;
    }
    if (mhc == true) {
        mhc = 1;
    } else {
        mhc = 0;
    }
    if (check != "4") { why2 = "N/A"; }
    if (niv == "vwo") { niv = 3; } else if (niv == "havo") { niv = 2; } else if (niv == "vmbo") { niv = 1; }
    var newKey = database.ref().child('results').push().key;
    database.ref('results_late/' + newKey).set({
        testcode: parseInt(testcode, 10),
        niveau: niv,
        jaar: parseInt(jaar, 10),
        switch: mhc,
        win: win,
        why: parseInt(check, 10),
        why2: why2
    });
    return true;
};

var runSimul = function runSimul() {
    $(".cont1").click(function() {
        var mhi11 = $(".door.picked").children("img").attr("class");
        mhi1 = parseInt(mhi11, 10);
        if (isNaN(mhi1) || mhi1 == null) {
            $(".warning1-text").text("Deur niet ingevuld.");
            $("#warning1").slideDown(del);
        } else if (mhi1 <= 0) {
            $(".warning1-text").text("Deur moet minstens 1 zijn.");
            $("#warning1").slideDown(del);
        } else if (mhi1 > testcode) {
            $(".warning1-text").text("Deur valt buiten bereik. (max " + testcode + ")");
            $("#warning1").slideDown(del);
        } else {
            pick = false;
            $(".mhp-selected").text(mhi1);
            $("#first").slideUp(del).delay(del);
            if (mhi1 == win) {
                while ( (clo == null) || (clo == mhi1) ) {
                    clo = Math.floor(Math.random() * testcode) + 1;
                }
            } else {
                clo = win;
            }
            drawDoors(3);
            //$(".picked").removeClass("picked");
            pick = true;
            $(".mhp-closed").text(clo);
            $("#second").slideDown(del);
        }
    });
    $(".cont2").click(function() {
        var sel = parseInt($(".picked").children("img").attr("class"), 10);
        if (sel != mhi1) {
            mhc = true;
            mhi1 = clo;
        } else {
            mhc = false;
        }
        pick = false;
        $("#second").slideUp(del).delay(del);
        if (mhc == true) {
            $("#secondsw").slideDown(del).delay(1500);
        } else if (mhc == false) {
            $("#secondst").slideDown(del).delay(1500);
        } else {
            $("#error3").slideDown(del).delay(1500);
        }
        $(".mhp-selected").text(mhi1);
        $("#third").slideDown(del);
    });
    $(".resul").children(".cont").click(function() {
        $(".mhp-win").text(win);
        $("#third").children("#button").slideUp(del).delay(del);
        if (mhi1 == win) {
            $("#third").children(".continue").children("a").addClass("btn-success");
            $("#third").children("#win, .continue").slideDown(del);
        } else {
            $("#third").children(".continue").children("a").addClass("btn-warning");
            $("#third").children("#lose, .continue").slideDown(del);
        }
        drawDoors(4);
    });
    $("#third").children(".continue").children(".cont").click(function() {
        $("#third").slideUp(del).delay(del);
        if (mhc == false) {
            $("#whystick").show();
        } else {
            $("#whyswitch").show();
        }
        $("#fourth").slideDown(del);
        $("#doors").slideUp(del).delay(del);
    });
    $(".radio").children(".dontcare").click(function() { $(this).parents().siblings("#why2").slideUp(del);});
    $(".radio").children(".whyohwhy").click(function() { $(this).parents().siblings("#why2").slideDown(del).addClass("act2"); });
    $(".radio").children("label").click(function() { check = $(this).children().val(); });
    $(".noinfo").click(function() { $(".nosave").slideToggle(del).delay(del); });
    $("#fourth").children(".savedata").children(".cont").click(function() {
        why2 = $(".act2").val();
        //$(".check2").text(why2);
        if ((check == null) || (check == 4 && why2 == null)) {
            $(".error4").slideDown(del);
        } else {
            if (saveAll() == true) {
                $(".savedata").slideUp(del);
                $(".error4").slideUp(del);
                $(".saved").slideDown(del);
                $("#fourth").children("p").slideUp(del);
                $("#fourth").children(".well").slideUp(del);
            } else {
                $(".error4").text("Een onverwachte fout is opgetreden, probeer het later opnieuw.");
            }
        }
    });
    $(".nosavebtn").click(function() {
        check = -1;
        saveAll();
        $(".savedata").slideUp(del);
        $(".error4").slideUp(del);
        $(".saved").children("h3").attr("style","color:darkred !important").text("Resultaten NIET opgeslagen");
        $(".saved").slideDown(del);
        $("#fourth").children("p").slideUp(del);
        $("#fourth").children(".well").slideUp(del);
    });
    $(".door").click(function() {
        if (pick == true) {
            $(this).addClass("picked");
            $(this).siblings().removeClass("picked");
            drawDoors(2);
            $(".cont1").slideDown(del);
        }
    });
    $(".showAllDoors").click(function() {
        if ($(this).hasClass("coll")) {
            $(this).removeClass("coll").addClass("expa");
            $(this).text("Laat alleen relevante deuren zien");
            drawDoors(5);
        } else if ($(this).hasClass("expa")) {
            $(this).removeClass("coll").addClass("expa");
            $(this).text("Laat alle deuren zien");
            drawDoors(3);
        }
    });
};

var drawDoors = function drawDoors(step) {
    if (step == 1) {
        for(var i = 1; i <= testcode; i++) {
            $("#doors").append('<div class="door"><h4>Deur ' + i + '</h4><img class="'+ i + 'door" src="site/png/duc.png" /></div>');
        }
    } else if (step == 2) {
        $(".door").children("img").attr("src","site/png/duc.png");
        $(".door.picked").children("img").attr("src","site/png/dsc.png");
    } else if (step == 3) {
        for(var i = 1; i <= testcode; i++) {
            if (!(i == win || i == mhi1 || i == clo)) {
                $("." + i + "door").parent("div.door").fadeOut(del);
            }
        }
    } else if (step == 4) {
        for(var i = 1; i <= testcode; i++) {
            if (i == win && i != mhi1) {
                $("." + i + "door").attr("src","site/png/dos.png");
            } else if (i == win && i == mhi1) {
                $("." + i + "door").attr("src","site/png/doss.png");
            } else if (i != win && i == mhi1) {
                $("." + i + "door").attr("src","site/png/dofs.png");
            } else {
                $("."+ i + "door").attr("src","site/png/dof.png");
            }
        }
    } else if (step == 5) {
        $("div.door").fadeIn(del);
    }
};

$(document).ready(function() {
    $(".noQuery").hide();
    if ((!(niv == "vmbo") && !(niv == "havo") && !(niv == "vwo")) || !(jaar > 0 && jaar < 7) ) {
        $("#noerror1").hide();
        $("#error1").show();
        $("#error1").children(".sub").text("error code: 1");
    } else if ( !(testcode > 2 && testcode < 101) ) {
        $("#noerror1").hide();
        $("#error1").show();
        $("#error1").children(".sub").text("error code: 2");
    } else if ( testKlas(niv, jaar) == true ) {
        finish(testcode);
        drawDoors(1);
        runSimul();
    }
});