import BlogsTestModel from "../Models/blogModelTest.js";
import UsersModel from "../Models/Users.js";
import mongoose from "mongoose";
// CreateBlog

// CreateBlog
// export const createBlog = async (req, res) => {
//   try {
//     // Get user ID from request or localStorage
//     const userId = req.body.userId || localStorage.getItem("userId");

//     // Check if user ID is available
//     if (!userId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "User ID is missing" });
//     }

//     // finding the user with userId
//     const user = await UsersModel.findById(userId);
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     // Create blog post with user ID
//     const blog = await new BlogsTestModel({ ...req.body, userId }).save();
//     res.status(201).json({ success: true, data: blog });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// GetAllBlogs
export const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await BlogsTestModel.find();
    res.status(200).json({ success: true, data: allBlogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

// GetBlogById
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogsTestModel.findById(id);
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

// UpdateBlogById
export const updateBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await BlogsTestModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

// DeleteBlogById
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogsTestModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
//New code
// Controller function to get user by email
export const getUserByEmail = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await UsersModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//////////////////////////////////////////////////////

export const getBlogByIdNew = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received id:", id);
    const blog = await BlogsTestModel.findById(id);
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

export const createBlog = async (req, res) => {
  try {
    // const userId = req.body.userId || localStorage.getItem("userId");
    const userId = req.body.userId;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is missing" });
    }

    const user = await UsersModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const blog = await new BlogsTestModel({ ...req.body, userId }).save();
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create Comment
export const createComment = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid blog ID format" });
    }

    const blog = await BlogsTestModel.findById(id);

    console.log("Blog found:", blog);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    const { text, author, userId } = req.body;
    console.log("Received comment data:", text, author, userId);

    if (!text || !author || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid comment data" });
    }

    const newComment = {
      text,
      author,
      date: new Date().toISOString(),
      userId,
    };

    blog.comments.push(newComment);
    const updatedBlog = await blog.save();

    res.status(201).json({ success: true, data: updatedBlog });
  } catch (error) {
    console.error("Error creating comment:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
//updateCommentById
export const updateCommentById = async (req, res) => {
  try {
    const { id: blogId, commentId } = req.params;
    const { text, author } = req.body;

    const blog = await BlogsTestModel.findById(blogId);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    const commentIndex = blog.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    const comment = blog.comments[commentIndex];

    if (comment.author !== author) {
      return res
        .status(403)
        .json({ success: false, message: "Permission denied" });
    }

    blog.comments[commentIndex] = { ...comment, text, author };
    const updatedBlog = await blog.save();

    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DeleteCommentById
export const deleteCommentById = async (req, res) => {
  try {
    const { id: blogId, commentId } = req.params;

    const blog = await BlogsTestModel.findById(blogId);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    const commentIndex = blog.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    blog.comments.splice(commentIndex, 1);
    const updatedBlog = await blog.save();

    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UpdateLikesById
export const updateLikesById = async (req, res) => {
  try {
    const { id } = req.params;
    const { likes } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid blog ID format" });
    }

    const blog = await BlogsTestModel.findById(id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    blog.likes = likes;
    const updatedBlog = await blog.save();

    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//filter

export const getBlogsByAuthor = async (req, res) => {
  try {
    const { author } = req.query;

    if (!author) {
      return res
        .status(400)
        .json({ success: false, message: "Author name is missing" });
    }

    //authorname is not there need to change
    const blogsByAuthor = await BlogsTestModel.find({ authorName: author });

    if (!blogsByAuthor || blogsByAuthor.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Blogs not found for the author" });
    }

    res.status(200).json({ success: true, data: blogsByAuthor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
