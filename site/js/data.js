/* global $ firebase*/

var del = 300;
var database = firebase.database();

var getData = function getData(callback) {
    var idn,id,tc,nv,jr,sw,wi,wy,wt;
    idn = 1;
    id = [];
    tc = [];
    nv = [];
    jr = [];
    sw = [];
    wi = [];
    wy = [];
    wt = [];
    database.ref('results').once('value', function(snapshot) {
        snapshot.forEach(function(child) {
            var perform = child.val();
            id.push(idn);
            idn++;
            tc.push(perform.testcode);
            nv.push(perform.niveau);
            jr.push(perform.jaar);
            sw.push(perform.switch);
            wi.push(perform.win);
            wy.push(perform.why);
            wt.push(perform.why2);
        });
        callback([id,tc,nv,jr,sw,wi,wy,wt]);
    });
};

var betterWork = function betterWork() {
    $(".dSimul").click(function() {
        $(".dSimulBar").slideToggle(del);
    });
};

$(document).ready(function() {
    $(".noQuery").hide();
    getData(function(data) {
        var id = data[0];
        var tc = data[1];
        var nv = data[2];
        var jr = data[3];
        var sw = data[4];
        var wi = data[5];
        var wy = data[6];
        var wt = data[7];
        //console.log(id);
        for (var i = 0; i < id.length; i++) {
            if (nv[i] == 3) { nv[i] = "vwo"}
            else if (nv[i] == 2) { nv[i] = "havo"}
            else if (nv[i] == 1) { nv[i] = "vmbo"}
            else { nv[i] = "error" }
            if (sw[i] == 1) { sw[i] = "ja" } else if (sw[i] == 0) { sw[i] = "nee" } else { sw[i] = "error" }
            if (wi[i] == 1) { wi[i] = "ja" } else if (wi[i] == 0) { wi[i] = "nee" } else { wi[i] = "error" }
            $("#data").append("<tr><td>"+id[i]+"</td><td>"+tc[i]+"</td><td>"+nv[i]+"</td><td>"+jr[i]+"</td><td>"+sw[i]+"</td><td>"+wi[i]+"</td><td>"+wy[i]+"</td><td>"+wt[i]+"</td></tr>");
        }
        $("#data").prepend("<tr><th>id</th><th>testcode</th><th>niveau</th><th>jaar</th><th>win</th><th>wissel</th><th>waarom</th><th>waarom 2</th></tr>");
    });
    betterWork();
});