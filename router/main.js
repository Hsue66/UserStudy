var fs = require('fs')

module.exports = function(app){

  var userjsonDir = __dirname + "/../userdata/user.json";

  app.get('/',function(req,res){
     res.render('main');
  });

  app.get('/bestMap',function(req,res){
    var sess = req.session;
    console.log(sess.dataset);
    res.render("bestMap",{dataset:sess.dataset});
  });

  app.post("/sendQ1",function(req,res){
    var sess = req.session;
    sess.q1 = req.body.Map;
    res.redirect("eachMap");
  });

  app.post("/next",function(req,res){
    var sess = req.session;
    console.log(sess.q2)
    sess.q2 = req.body.articles;
    console.log(sess.q2)
    res.send('NENENEEN')
  });

  app.get('/eachMap',function(req,res){
    var sess = req.session;
    console.log(sess.dataset);
    res.render("eachMap",{dataset:sess.dataset});
  });

  app.get("/cohMap/:data",function(req,res){
    console.log(req.params.data)
    res.render("cohMap",{dataset:req.params.data});
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
        sess.q1 = '';
        sess.q2 = [];
        //res.json(result);
        res.redirect("bestMap")
    });
  });

}
