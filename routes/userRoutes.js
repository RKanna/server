import express from "express";
import {
  getUserById,
  updateUserProfile,
} from "../controllers/userController.js";

const route = express.Router();

// Get user by ID
// GET => http://localhost:5000/api/v1/users/:id
route.get("/:id", getUserById);

route.put("/:id", updateUserProfile);

export default route;
