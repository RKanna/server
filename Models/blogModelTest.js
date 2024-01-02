const mongoose = require("mongoose");

const BlogsSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const BlogsTestModel = mongoose.model("blogs", BlogsSchema);
module.exports = BlogsTestModel;
