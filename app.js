//Required and constants
const express = require("express");
const app = express();
var faker = require("faker");
var bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Variables and Appropriate Logic
var Camps = [];

for (let i = 0; i < 10; i++) {
  let place = {
    name: faker.address.county(),
    image: faker.image.image(),
  };

  Camps.push(place);
}

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  res.render("campgrounds", { Camps });
  console.log(Camps);
});

app.post("/campgrounds", (req, res) => {
  //   res.send("You have Hit the Campgrounds Post Page");
  var newPlace = {
    name: req.body.camp,
    image: req.body.image,
  };
  console.log(newPlace);

  Camps.push(newPlace);

  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new");
});

app.listen(3000, (req, res) => {
  console.log("Server Running on Port 3000");
});
