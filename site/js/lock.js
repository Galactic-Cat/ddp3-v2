/* global $ */

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

var lock = getUrlParameter("lock");

var lockDoc = function lockDoc() {
    $(".content").hide();
    $(".lock").show();
    $("body").keydown(function( event ) {
        if (event.which == 88) {
            $(".lock").hide();
            $(".content").show();
        }
    });
};

$(document).ready(function() {
    if (lock == "1") {
        lockDoc();
    }
})