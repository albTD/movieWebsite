
const express = require("express");
const bodyParser = require("body-parser");



const app = express();

// app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.get("/movie",function(req,res){
  res.sendFile(__dirname+"/movie.html");
})


//TODO

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});