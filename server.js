var express = require("express");
var mysql = require("mysql");

const exp = require("constants");
var app = express();

app.use(express.static("public"));

var x = require("express-fileupload");
const { send } = require("process");
app.use(express.urlencoded({ extended: true }));
app.use(x());

dbconfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "taxi rental system"
}


dbconnected = mysql.createConnection(dbconfig);
dbconnected.connect(function (err) {
    if (err)
        console.log(err);
    else
        console.log("connected");
})




app.listen(4000, function () {
    console.log("server started");
})

app.get("/searchVO", function (req, resp) {
    var dataAry = [req.query.uid];
    dbconnected.query("select * from oprofile where uid=?", dataAry, function (err, result) {
        if (err)
            console.log(err)
        else
            resp.send(result);
    })
})
app.get("/searchVd", function (req, resp) {
    var dataAry = [req.query.vnum];
    dbconnected.query("select * from vehicle where vehno=?", dataAry, function (err, result) {
        if (err)
            console.log(err)
        else
            resp.send(result);
    })
})

app.get("/checksignup", function (req, resp) {

    var dataAry = [req.query.x];
    dbconnected.query("select * from users where uid=?", dataAry, function (err, result) {
        if (err)
            console.log(err)
        else
            resp.send(result);
    })

})





app.get("/checklogin", function (req, resp) {

    var dataAry = [req.query.xv, req.query.yv];
    dbconnected.query("select * from users where uid=? and pwd=?", dataAry, function (err, result) {
        if (err)
            console.log(err)
        else
            resp.send(result);
    })

})

app.get("/vehicledash", function (req, resp) {
    resp.sendFile(process.cwd() + "/public/vehicledashbboard.html");
})
app.get("/vehicledashowner", function (req, resp) {
    resp.sendFile(process.cwd() + "/public/Vownerprofile.html");
})
app.get("/vehicledashvehicle", function (req, resp) {
    resp.sendFile(process.cwd() + "/public/Vehicledetails.html");
})
app.get("/adminclient", function (req, resp) {
    resp.sendFile(process.cwd() + "/public/clientlist.html");
})
app.get("/HireVehicle", function (req, resp) {
    resp.sendFile(process.cwd() + "/public/marketplaceVlist.html");
})


app.get("/adminuoisuijkfsffoiuwrert87beterntioertrntevr9jt9erj7tnert89beritoermtev8vyert7tner9n8y", function (req, resp) {
    resp.sendFile(process.cwd() + "/public/admin_dash.html");
})

app.get("/adminvehicleowner", function (req, resp) {
    resp.sendFile(process.cwd() + "/public/Vonwerlist.html");
})
app.get("/delete-Vowner-angular", function (req, resp) {
    var uid = req.query.x;
    dbconnected.query("delete from oprofile where uid=?", [uid], function (err, result) {
        if (err) {
            resp.send(err);
        }
        else {
            resp.send(result.affectedRows + "  Records Deleted");
        }
    })
})



app.get("/fetchcontactdetails", function (req, resp) {
    dbconnected.query("select contact,address from oprofile where uid=?", req.query.x, function (err, result) {
        if (err) {
            resp.send(err);
            console.log(err);
        }
        else {
            resp.send(result);
        }

    })
})

app.get("/fetchallVehicleAngular", function (req, resp) {
  
    dataarraies = [req.query.seat,req.query.city];
    dbconnected.query("select * from vehicle where seats=? and city=?", dataarraies, function (err, result) {
        if (err) {
            resp.send(err);
        }
        else {
            resp.send(result);
        }
    })

})
app.get("/fetchallVownerAngular", function (req, resp) {
    dbconnected.query("select * from oprofile",function (err, result) {
        if (err) {
            resp.send(err);
        }
        else {
            resp.send(result);
        }
    })

})
app.get("/fetchcityname", function (req, resp) {
   
    dbconnected.query("select distinct city from vehicle", function (err, result) {
        if (err) {
            resp.send(err);
        }
        else {
            resp.send(result);
        }
    })

})

app.get("/fetchseats", function (req, resp) {

    dbconnected.query("select distinct seats from vehicle", function (err, result) {
        if (err) {
            resp.send(err);
        }
        else {
            resp.send(result);
        }
    })

})

app.post("/Vdsubmit", function (req, resp) {


    picname1 = req.files.inputtpic1.name;
    picname2 = req.files.inputtpic2.name;
    var desfolder1 = process.cwd() + "/public/uploads_vehicle_details/" + picname1;
    var desfolder2 = process.cwd() + "/public/uploads_vehicle_details/" + picname2;

    req.files.inputtpic1.mv(desfolder1, function (err) {
        if (err)
            console.log(err);
            else
            console.log("noo error");
         
    });
    req.files.inputtpic2.mv(desfolder2, function (err) {
        if (err)
            console.log(err);
            else
            console.log("noo error");
       

    });




    var dataarray = [req.body.inputUid, req.body.inputVnum, req.body.inputpermittype, req.body.inputModel, req.body.inputCompany, req.body.inputseat, req.body.inputManufactureyear, req.body.inputMincharges, req.body.inputFuel, picname1, picname2, req.body.inputcity];
    dbconnected.query("insert into vehicle values(?,?,?,?,?,?,?,?,?,?,?,?)", dataarray, function (err) {
        if (err) {
            console.log(err);
            resp.send("Submission not successful");
        }
        else
        resp.redirect("/vehicledash");
    })
})
app.post("/Vdupdate", function (req, resp) {


    var picname1;
    var picname2;

    if (req.files == null) {
        picname1 = req.body.hdn1;
        picname2 = req.body.hdn2;
    }
    else {
        picname1 = req.files.inputtpic1.name;
        picname2 = req.files.inputtpic2.name;
        var desfolder1 = process.cwd() + "/public/uploads_vehicle_details/" + picname1;
        var desfolder2 = process.cwd() + "/public/uploads_vehicle_details/" + picname2;

        req.files.inputtpic1.mv(desfolder1, function (err) {
            if (err)
                console.log(err+"                                         1st error");
                else
                console.log("noo error");
            
        })
        req.files.inputtpic2.mv(desfolder2, function (err) {
            if (err)
                console.log(err+"                                         2st error");
                else
                console.log("noo error");
        })

    }

    var dataarray = [req.body.inputUid, req.body.inputpermittype, req.body.inputModel, req.body.inputCompany, req.body.inputseat, req.body.inputManufactureyear, req.body.inputMincharges, req.body.inputFuel, picname1, picname2, req.body.inputcity, req.body.inputVnum];
    dbconnected.query("update vehicle set uid=?,permit=?,model=?,company=?,seats=?,myear=?,charges=?,fuel=?,pic1=?,pic2=?,city=? where vehno=?", dataarray, function (err) {
        if (err) {
            console.log(err);
            resp.send("updation not successful");
        }
        else
        resp.redirect("/vehicledash");
    })
})










app.post("/VOsubmit", function (req, resp) {


    picname = req.files.inputtpic.name;
    var desfolder = process.cwd() + "/public/uploads_vehicle_owner/" + picname;

    req.files.inputtpic.mv(desfolder, function (err) {
        if (err)
            console.log(err);
        else
            console.log("signedup");
    });




    var dataarray = [req.body.inputUid, req.body.inputAddress, req.body.inputCity, req.body.inputState, req.body.inputidproof, req.body.inputproofnum, req.body.inputphonenum, picname];
    dbconnected.query("insert into oprofile values(?,?,?,?,?,?,?,?)", dataarray, function (err) {
        if (err) {
            console.log(err);
            resp.send("Submission not successful");
        }
        else
            resp.send("Submission successful");
    })

})
app.post("/VOupdate", function (req, resp) {


    var picname;

    if (req.files == null)
        picname = req.body.hdn;
    else {
        picname = req.files.inputtpic.name
        var desfolder = process.cwd() + "/public/uploads_vehicle_owner/" + picname;

        req.files.inputtpic.mv(desfolder, function (err) {
            if (err)
                console.log(err);
            else
                console.log("No Errrroooorrr-file uploaded ");
        })

    }

    var dataarray = [req.body.inputAddress, req.body.inputCity, req.body.inputState, req.body.inputidproof, req.body.inputproofnum, req.body.inputphonenum, picname, req.body.inputUid];
    dbconnected.query("update oprofile set address=?,city=?,state=?,proof=?,pnumber=?,contact=?,picpath=? where uid=?", dataarray, function (err) {
        if (err) {
            console.log(err);
            resp.send("updation not successful");
        }
        else
            resp.send("updation successful");
    })
})

app.post("/", function (req, resp) {
    resp.sendFile(process.cwd() + "/public/index.html");
})
app.get("/signup", function (req, resp) {
    var dataarray = [req.query.x, req.query.y, req.query.z];
    dbconnected.query("insert into users values(?,?,?)", dataarray, function (err) {
        if (err)
            resp.send("Signup not successful");
        else
            resp.send("Signup successful");
    })


})
