//Required and constants
const mongoose = require("mongoose");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");

//Module Imports
const Camp = require("./models/camp");
const Comment = require("./models/comment");
const Seed = require("./seeds");

//app use
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//App connection to the DBs
mongoose.connect("mongodb://localhost:27017/CampsDB", {
  useNewUrlParser: true,
});

Seed();

//LANDING PAGE ROUTE
app.get("/", (req, res) => {
  res.render("landing");
});

//HOME ROUTE
app.get("/campgrounds", (req, res) => {
  Camp.find({}, (error, allCamps) => {
    if (error) {
      console.log(error);
    } else {
      res.render("Camps/campgrounds", { Camps: allCamps });
      console.log(allCamps);
    }
  });
});

app.post("/campgrounds", (req, res) => {
  //   res.send("You have Hit the Campgrounds Post Page");
  var newCamp = {
    name: req.body.camp,
    image: req.body.image,
    description: req.body.description,
  };
  console.log(newCamp);

  Camp.create(newCamp, (error, newCamp) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect("/campgrounds");
      console.log(newCamp);
    }
  });
});

app.get("/campgrounds/new", (req, res) => {
  res.render("Camps/new");
});

app.get("/campgrounds/:id", (req, res) => {
  let campId = req.params.id;
  Camp.findById(campId)
    .populate("comments")
    .exec((error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        res.render("Camps/show", { result });
      }
    });
});

app.get("/campgrounds/:id/comments/new", (req, res) => {
  let campId = req.params.id;
  res.render("Comments/new", { campId });
});

app.post("/campgrounds/:id/comments", (req, res) => {
  // Get the Camp Id
  var CampId = req.params.id;

  var newComment = {
    text: req.body.comment,
    author: req.body.author,
  };

  console.log("====================================");
  console.log(CampId);
  console.log("====================================");

  //find Camp by Id

  Camp.findById(CampId, (error, foundCamp) => {
    if (error) {
      console.log(error);
    } else {
      //create comment
      Comment.create(newComment, (error, comment) => {
        if (error) {
          console.log(error);
        } else {
          foundCamp.comments.push(comment);
          foundCamp.save();
          res.redirect("/campgrounds/" + CampId);
        }
      });
    }
  });
});

app.listen(3000, (req, res) => {
  console.log("Server Running on Port 3000");
});
