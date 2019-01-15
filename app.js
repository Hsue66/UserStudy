var express = require("express"),
    app = express();
var bodyParser = require("body-parser");
var session = require('express-session');

app.use(bodyParser.urlencoded({extended: true}));
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use('/script', express.static(__dirname + '/node_modules/'));

app.use('/cytoData', express.static(__dirname + '/cytoData'));

app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

app.set("view engine", "ejs");

var router = require('./router/main')(app);
/*
app.get("/",function(req,res){
  res.render("main");
});

app.get("/bestMap",function(req,res){
  console.log(id);
  res.render("bestMap",{dataset:dataset[id]});
});

app.get("/cohMap",function(req,res){
  console.log(dataset[0][1]);
  res.render("cohMap",{dataset:dataset[0][1]});
});

app.get("/redTimeline",function(req,res){
  console.log(dataset[0][1]);
  res.render("redTimeline",{dataset:dataset[0][1]});
});

app.post("/next",function(req,res){
  id = req.body.Map;
  res.send(id);
});

app.post("/getId",function(req,res){
  id = req.body.id;
  res.redirect("/bestMap");
});
*/
app.listen(PORT, function(){
  console.log("SERVER HAS STARTED!!!");
});
