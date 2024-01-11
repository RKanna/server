import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
  getUserByEmail,
  getBlogByIdNew,
  createComment,
  updateCommentById,
  deleteCommentById,
  updateLikesById,
  getBlogsByAuthor,
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

// New route to get user by email
// GET => http://localhost:5000/api/v1/users?email=:email
router.get("/users", getUserByEmail);

//////////////////////////////////////

router.get("/new/:id", getBlogByIdNew);

//////////////////////////////////////
/////////////////////////////////////

//for creating comments
router.post("/:id/comments", createComment);

// update specific comment in specific blog
router.put("/:id/comments/:commentId", updateCommentById);

//deleting comment
router.delete("/:id/comments/:commentId", deleteCommentById);

//getting likes
router.put("/:id/likes", updateLikesById);

//filter
router.get("/filter", getBlogsByAuthor);
export default router;
