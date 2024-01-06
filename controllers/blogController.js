import BlogsTestModel from "../Models/blogModelTest.js";
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
