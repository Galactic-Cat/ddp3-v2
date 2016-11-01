/* global $ */

var getCode = function getCode(callback) {
    $.get("https://ddp3-cloned-mastergrid.c9users.io/site/php/get0.php",'',function(data) {
        console.log(data);
        var array = JSON.parse(data);
        console.log(array);
        callback(array);
    });
};

$(document).ready(function() {
    $(".noQuery").hide();
    getCode(function(data) {
        var tc = Math.floor(Math.random() * (data.length));
        $("#faketestcode").attr("placeholder",data[tc]);
        $("#testcode").val(data[tc]);
    });
});