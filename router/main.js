var fs = require('fs')

module.exports = function(app){

  var userjsonDir = __dirname + "/../userdata/user.json";

  app.get('/',function(req,res){
     res.render('main');
  });

  app.get('/bestMap',function(req,res){
    var sess = req.session;
    //console.log(sess.dataset);
    res.render("bestMap",{dataset:sess.dataset});
  });

  app.post("/sendQ1",function(req,res){
    var sess = req.session;
    if(req.body.Map === 'MapA')
      sess.Qd12 = sess.dataset[0];
    else
      sess.Qd12 = sess.dataset[1];

    res.redirect("eachMap");
  });

  app.get('/eachMap',function(req,res){
    var sess = req.session;
    //console.log(sess.dataset);
    res.render("eachMap",{dataset:sess.dataset});
  });

  app.get("/cohMap/:idx",function(req,res){
    console.log(req.params.idx)
    var sess = req.session;
    res.render("cohMap",{idx:req.params.idx,dataset:sess.dataset[req.params.idx],redflag:0});
  });

  app.post("/next",function(req,res){
    var sess = req.session;

    if(parseInt(req.body.idx))
      sess.Qd2[parseInt(req.body.redflag)] = req.body.articles;
    else
      sess.Qd1[parseInt(req.body.redflag)] = req.body.articles;

    console.log("next")
    console.log(req.body.articles)
    console.log("------------------")
    console.log(sess.Qd1)
    console.log(sess.Qd2)

    if(parseInt(req.body.redflag))
      res.redirect("/redTLMap/"+req.body.idx);
    else
      res.redirect("/redMap/"+req.body.idx);
  });

  app.get("/redMap/:idx",function(req,res){
    //res.send(req.params.data)
    var sess = req.session;
    res.render("cohMap",{idx:req.params.idx,dataset:sess.dataset[req.params.idx],redflag:1});
  });

  app.get("/redTLMap/:idx",function(req,res){
    var sess = req.session;
    res.render("redTLMap",{idx:req.params.idx,dataset:sess.dataset[req.params.idx]});
  });

  app.post("/sendQ3",function(req,res){
    var sess = req.session;

    if(parseInt(req.body.idx))
      sess.Qd2[2] = req.body.topics;
    else
      sess.Qd1[2] = req.body.topics;

    console.log("Q3")
    console.log(req.body.topics)
    console.log("------------------")
    console.log(sess.Qd1)
    console.log(sess.Qd2)

    res.redirect("/conMap/"+req.body.idx);
  });

  app.get("/conMap/:idx",function(req,res){
    var sess = req.session;
    res.render("conMap",{idx:req.params.idx,dataset:sess.dataset[req.params.idx]});
  });

  app.post("/sendQ4",function(req,res){
    var sess = req.session;

    if(parseInt(req.body.idx))
      sess.Qd2[3] = req.body.Con_articles;
    else
      sess.Qd1[3] = req.body.Con_articles;

    console.log("Q4")
    console.log(req.body.Con_articles)
    console.log("------------------")
    console.log(sess.Qd1)
    console.log(sess.Qd2)

    res.send("CONNNN")
    //res.redirect("/conMap/"+req.body.idx);
  });

  app.post("/login",function(req,res){
    var username = req.body.id;
    var sess;
    sess = req.session;

    fs.readFile(userjsonDir, "utf8", function(err, data){
        var users = JSON.parse(data);
        //var username = req.params.username;
        //var password = req.params.password;
        var result = {};
        if(!users[username]){
            // USERNAME NOT FOUND
            result["success"] = 0;
            result["error"] = "not found";
            res.json(result);
            return;
        }
        result["success"] = 1;
        sess.username = username;
        sess.name = users[username]["name"];
        sess.dataset = users[username]["dataset"];
        sess.Qd12 = "";
        sess.Qd1 = users[username]["Qd1"];
        sess.Qd2 = users[username]["Qd2"];
        //res.json(result);
        res.redirect("bestMap")
    });
  });

}
