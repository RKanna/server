const mongoose = require("mongoose");

const BlogsSchema = new mongoose.Schema(
  {
    // title:String,
    // content:String,
    title: {
      type: String,
      trim: true,
      required: true,
      minLength: [5, "Title must be of at least 5 characters"],
    },
    content: {
      type: String,
      trim: true,
      required: true,
      minLength: [5, "Content must be of at least 5 characters"],
    },
    // author: {
    //   type: String,
    //   trim: true,
    //     required: true,
    //   minLength: [5, "Author must be of at least 5 characters"],
    // },
    // tags: {
    //   type: [String],
    // },
    // datePublished: {
    //   type: Date,
    //     required: true,
    // },
    // comments: [
    //   {
    //     text: String,
    //     author: String,
    //     date: Date,
    //   },
    // ],
    // image: {
    //   type: String,
    //     required: true,
    // },
    // likes: {
    //   type: Number,
    // },
  },
  {
    timestamps: true,
  }
);

const BlogsTestModel = mongoose.model("blogs", BlogsSchema);
module.exports = BlogsTestModel;
