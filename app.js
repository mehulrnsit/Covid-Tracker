//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const https = require("https");
const request = require("request");

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  const url = `https://api.covidtracking.com/v1/us/current.json`;
  
  https.get(url, function (response) {
   
    response.on("data", function (data) {
      const countryData1 = JSON.parse(data);
      
      const i1 = 1;
      res.render("home",{content: countryData1[0],i:i1});
    });
  });
  
  
});

app.get("/states",function(req,res){

  var url="https://api.covidtracking.com/v1/states/info.json";
  request.get(url,function(error,response,body){
    states =JSON.parse(body);
    var I=1;
    // console.log(states);
    res.render("states",{contents:states,i:I});
  });
    
 
});

app.get("/state",async function(req, res) {
 
  const st =  req.query.st;
  const Name = req.query.Name;
 
  var url="https://api.covidtracking.com/v1/states/current.json";
  request.get(url,function(error,response,body){
    states =JSON.parse(body);
    var I=1;
    res.render("state",{contents:states,i:I,st:st,Name:Name});
  });
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});
