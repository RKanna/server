import BlogsTestModel from "../Models/blogModelTest.js";
import UsersModel from "../Models/Users.js";
// CreateBlog
export const createBlog = async (req, res) => {
  try {
    // console.log(req.body);
    const blog = await new BlogsTestModel(req.body).save();
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

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
