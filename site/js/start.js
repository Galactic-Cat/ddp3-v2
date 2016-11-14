/* global $ firebase*/

var database = firebase.database();

var getCode = function getCode(callback) {
    var datalist = database.ref('code');
    datalist.on('value', function(snapshot) {
        callback(snapshot.val());
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