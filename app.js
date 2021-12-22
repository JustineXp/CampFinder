//Required and constants
const mongoose = require("mongoose");
const express = require("express");
const app = express();
var faker = require("faker");
var bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/CampsDB", {
  useNewUrlParser: true,
});

//CREATE A SCHEMA FOR DATABASE DATA FORMATING

const campSchema = mongoose.Schema({
  name: String,
  image: String,
  description: String,
});

//CREATE A SINGLE DATA ENTITY MODEL
const Camp = mongoose.model("Camp", campSchema);

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  Camp.find({}, (error, allCamps) => {
    if (error) {
      console.log(error);
    } else {
      res.render("campgrounds", { Camps: allCamps });
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
  res.render("new");
});

app.get("/campgrounds/:id", (req, res) => {
  let campId = req.params.id;
  Camp.findById(campId, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.render("show", { result });
    }
  });
});

app.listen(3000, (req, res) => {
  console.log("Server Running on Port 3000");
});
