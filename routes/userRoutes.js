import express from "express";
import {
  getUserById,
  //   uploadImage,
  //   getUserByUserName,
} from "../controllers/userController.js";

const route = express.Router();

// Get user by ID
// GET => http://localhost:5000/api/v1/users/:id
route.get("/:id", getUserById);

// Get user by userName
// route.get("/", getUserByUserName);

// // Upload image
// // POST => http://localhost:5000/api/v1/users/:id/upload
// route.post("/:id/upload", uploadImage);

export default route;
