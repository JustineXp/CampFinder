const mongoose = require("mongoose");

//CREATE A SCHEMA FOR DATABASE DATA FORMATING

const commentSchema = mongoose.Schema({
  text: String,
  author: String,
});

//CREATE A SINGLE DATA ENTITY MODEL
module.exports = mongoose.model("Comment", commentSchema);
