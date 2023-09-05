var myVar = setInterval(function () { myTimer() }, 100);

function myTimer() {
    var d = new Date();
    document.getElementById("demo").innerHTML = d.toLocaleTimeString();
    document.getElementById("demo").title = d.toLocaleDateString() + "  " + d.toLocaleTimeString();
}


$(document).ready(function () {

    $("#txtUidS").blur(function () {
        var uidvalue = $("#txtUidS").val();
        var url = "/checksignup?x=" + uidvalue;

        $.get(url, function (result) {
            if (result.length == 0)
                $("#mesaggeusernamesignup").text("Username available");
            else
                $("#mesaggeusernamesignup").text("Username not available");

        });

    });





    $("#signinbtn").click(function () {
        var uidvalue = $("#txtUidL").val();
        var pwd = $("#txtPwdL").val();
        var url = "/checklogin?xv=" + uidvalue + "&yv=" + pwd;

        $.get(url, function (result) {
            if (result.length == 0)
                alert("credentials not valid");
            else {
                // alert(result[0].utype);
                localStorage.setItem("uid", uidvalue);
                if (result[0].utype == "vehicle_Owner") {
                    location.href = "/vehicledash";
                }
                else
                    location.href = "/HireVehicle";
            }

        });

    });



    $("#signupbtn").click(function () {
        var xv = $("#txtUidS").val();
        var yv = $("#txtPwdS").val();
        var zv = $("#txtUtypeS").val();
        var url = "/signup?x=" + xv + "&y=" + yv + "&z=" + zv;
        $.get(url, function (result) {
            alert(result);
        });
    });





});