module.exports = function(app){

  app.get("/",function(req,res){
    var test = ['greece.json','greece2.json']
    res.render("main",{targets:test});
  });

  app.get("/start",function(req,res){
    res.render("start");
  });

  app.post("/getId",function(req,res){

    var name = req.body.name;
    var img = req.body.img;
    console.log(name);
    res.redirect("/start");
  });
}
