var express = require("express"),
    app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use('/script', express.static(__dirname + '/node_modules/'));

app.use('/cytoData', express.static(__dirname + '/cytoData'));

app.set("view engine", "ejs");

var dataset = {
  '0':['greece.json','greece2.json'],
  '1':['greece2.json','greece.json'],
}

app.get("/",function(req,res){
  res.render("main");
});

app.get("/start",function(req,res){
  res.render("start");
});

app.post("/getId",function(req,res){
  var id = req.body.id;
  console.log(id);
  res.redirect("/start");
});

app.listen(PORT, function(){
  console.log("SERVER HAS STARTED!!!");
});
