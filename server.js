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

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"
mongoose.connect(MONGODB_URI);

//Routes
app.get("/scrape", function(req, res) {
    axios.get("http://www.foxnews.com/").then(function(response) {
      // console.log(response);
      var $ = cheerio.load(response.data);
      
      $(".article").each(function(i, element) {
        var result = {};
        console.log("what is this: " + $(this).find('.content').children('ul').text());
        result.headline = $(this)
            .find('h2')
            .children('a')
            .text();
      //   result.summary = $(this)
      //       .children("ul")
      //       .text();
        result.link = $(this)
            .find('h2')
            .children('a')
            .attr('href');
        // db.Article.create(result)
        //   .then(function(dbArticle) {
        //     console.log(dbArticle);
        //   })
        //   .catch(function(err) {
        //     console.log(err);
        //   });
       });
  
      res.send("Scrape Complete");
    });
  });
  
  // app.get("/articles", function(req, res) {
  //   db.Article.find({})
  //     .then(function(dbArticle) {
  //       res.json(dbArticle);
  //     })
  //     .catch(function(err) {
  //       res.json(err);
  //     });
  // });
  
  // app.get("/articles/:id", function(req, res) {
  //   db.Article.findOne({ _id: req.params.id })
  //     .populate("note")
  //     .then(function(dbArticle) {
  //       res.json(dbArticle);
  //     })
  //     .catch(function(err) {
  //       res.json(err);
  //     });
  // });
  
  app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body)
      .then(function(dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:" + PORT +"!");
});