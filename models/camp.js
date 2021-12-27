const mongoose = require("mongoose");
const Comment = require("./comment");

//CREATE A SCHEMA FOR DATABASE DATA FORMATING

const campSchema = mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

//CREATE A SINGLE DATA ENTITY MODEL
module.exports = mongoose.model("Camp", campSchema);
