import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} from "../controllers/blogController.js";
const router = express.Router();
// createBlog
// POST => http://localhost:5000/api/v1/blog
router.post("/", createBlog);

// getAllBlogs
// GET => http://localhost:5000/api/v1/blog
router.get("/", getAllBlogs);

// getBlogById
// GET => http://localhost:5000/api/v1/blog/:id
router.get("/:id", getBlogById);

// updateBlogById
// PUT => http://localhost:5000/api/v1/blog/:id
router.put("/:id", updateBlogById);

// deleteBlogById
// DELETE => http://localhost:5000/api/v1/blog/:id
router.delete("/:id", deleteBlogById);

export default router;
