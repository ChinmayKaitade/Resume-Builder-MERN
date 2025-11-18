import express from "express";
// Import user authentication and data retrieval controllers.
import {
  getUserById,
  getUserResumes,
  loginUser,
  registeredUser,
} from "../controllers/userController.js";
// Import the authentication middleware to secure user-specific endpoints.
import protect from "../middlewares/authMiddleware.js";

/**
 * @fileoverview User Routes 🔐
 * Defines all API endpoints related to user authentication, authorization,
 * and retrieval of user-specific data (profile and resumes).
 */
const userRouter = express.Router();

// --- Public Routes (No Authentication Required) ---

// POST /api/users/register
// Handles creation of a new user account.
userRouter.post("/register", registeredUser);

// POST /api/users/login
// Handles user sign-in and issuance of a JSON Web Token (JWT).
userRouter.post("/login", loginUser);

// --- Protected Routes (Authentication Required) ---

// GET /api/users/data
// Retrieves the profile data of the currently authenticated user.
// Middleware stack: Authentication (`protect`) -> Controller.
userRouter.get("/data", protect, getUserById);

// GET /api/users/resumes
// Retrieves all resumes owned by the currently authenticated user.
// Middleware stack: Authentication (`protect`) -> Controller.
userRouter.get("/resumes", protect, getUserResumes);

export default userRouter;
