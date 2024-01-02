import Blog from "../Models/blogModel.js";
// CreateBlog
export const createBlog = async (req, res) => {
  try {
    // console.log(req.body);
    const blog = await new Blog(req.body).save();
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

// GetAllBlogs
export const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find();
    res.status(200).json({ success: true, data: allBlogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

// GetBlogById
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

// UpdateBlogById
export const updateBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body);
    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

// DeleteBlogById
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
