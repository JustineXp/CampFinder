//Required and constants
const mongoose = require("mongoose");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

//Module Imports
const Camp = require("./models/camp");
const Comment = require("./models/comment");
const Seed = require("./seeds");

//app use
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
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
  console.log("===========================================================");
  console.log(req);
  console.log("===========================================================");
  if (req.body.camp === 0) {
    res.redirect("/new/campgrounds");
  } else {
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
  }
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

app.get("/campgrounds/:id/edit", async (req, res) => {
  const campground = await Camp.findById(req.params.id);
  res.render("Camps/edit", { campground });
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

app.put("/campgrounds/:id/edit", async (req, res) => {
  var id = req.params.id;
  var updatedCamp = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    location: req.body.location,
    price: req.body.price,
  };

  await Camp.findByIdAndUpdate(id, updatedCamp).catch((error) => {
    console.log("///////////////////////////////");
    console.log(error);
  });

  res.redirect("/campgrounds/" + id);
});

app.delete("/campgrounds/:id", async (req, res) => {
  var id = req.params.id;
  await Camp.findByIdAndDelete(id);
  res.redirect("/campgrounds");
});

app.listen(3000, (req, res) => {
  console.log("Server Running on Port 3000");
});
