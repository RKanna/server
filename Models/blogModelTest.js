import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minLength: [2, "Title must be of atleast 5 characters"],
    },
    content: {
      type: String,
      trim: true,
      required: true,
      minLength: [2, "Content must be of atleast 5 characters"],
    },
    author: {
      type: String,
      trim: true,
      required: true,
      minLength: [2, "Author must be of atleast 5 characters"],
    },
    // author: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Users",
    //   required: true,
    // },
    tags: {
      type: [String],
    },
    datePublished: {
      type: Date,
      required: true,
      default: new Date(),
    },
    comments: [
      {
        text: String,
        author: String,
        date: Date,
      },
    ],
    image: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

blogSchema.virtual("shortDescription").get(function () {
  return this.content.slice(0, 200) + "...";
});

const BlogsTestModel = mongoose.model("blogs", blogSchema);

export default BlogsTestModel;
