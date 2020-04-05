var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT || 3000;
var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/", {useNewUrlParser: true});

app.get("/scrape", function(req, res){
    axios.get("").then(function(response){
        var $ = cheerio.load(response.data);
    });
});

app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:" + PORT);
});