import express from "express";
// Import authentication middleware.
import protect from "../middlewares/authMiddleware.js";
// Import the core controller functions for resume management.
import {
  createResume,
  deleteResume,
  getPublicResumeById,
  getResumeById,
  updateResume,
} from "../controllers/resumeController.js";
// Import Multer configuration for handling file uploads (multipart/form-data).
import upload from "../configs/multer.js";

/**
 * @fileoverview Resume Routes 🛠️
 * Defines all API endpoints for managing the user's resume documents (CRUD operations).
 * Endpoints requiring user-specific access are protected by `authMiddleware`.
 */
const resumeRouter = express.Router();

// --- 1. Create Resume ---
// POST /api/resumes/create
// Creates a new resume document in the database.
// Middleware stack: Authentication -> Controller.
resumeRouter.post("/create", protect, createResume);

// --- 2. Update Resume (Complex: Handles file upload) ---
// PUT /api/resumes/update
// Updates an existing resume, handling form data and an optional profile image upload.
// Middleware stack: Multer (parses 'image') -> Authentication -> Controller.
resumeRouter.put("/update", upload.single("image"), protect, updateResume);

// --- 3. Delete Resume ---
// DELETE /api/resumes/delete/:resumeId
// Deletes a specific resume belonging to the authenticated user.
// Middleware stack: Authentication -> Controller.
resumeRouter.delete("/delete/:resumeId", protect, deleteResume);

// --- 4. Get Authenticated User's Resume by ID ---
// GET /api/resumes/get/:resumeId
// Retrieves a specific resume document, restricted to the authenticated owner.
// Middleware stack: Authentication -> Controller.
resumeRouter.get("/get/:resumeId", protect, getResumeById);

// --- 5. Get Public Resume by ID (Share Link) ---
// GET /api/resumes/get/:resumeId
// Retrieves a resume document without authentication, provided the `public` flag is set to true.
// NOTE: This route should ideally use a different path segment (e.g., '/public/:resumeId')
// to avoid ambiguity with the authenticated GET route above, though Express will match based on order.
// Since it's placed last, it won't be reachable as the protected route above matches first.
// SUGGESTION: Move this route to its own dedicated public router or ensure the path is unique.
resumeRouter.get("/get/:resumeId", getPublicResumeById);

export default resumeRouter;
