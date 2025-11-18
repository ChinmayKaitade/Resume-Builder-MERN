import express from "express";
// Import the authentication middleware to secure the AI endpoints.
import protect from "../middlewares/authMiddleware.js";
// Import the AI controller functions for content enhancement and data parsing.
import {
  enhanceJobDescription,
  enhanceProfessionalSummary,
  uploadResume,
} from "../controllers/aiController.js";

/**
 * @fileoverview AI Routes 🧠
 * Defines all API endpoints related to AI functionality (content enhancement and data extraction).
 * All routes are secured using the `protect` authentication middleware.
 */
const aiRouter = express.Router();

// --- POST /api/ai/enhance-pro-sum ---
// Enhances a user's professional summary using the LLM.
// Requires authentication (`protect`).
aiRouter.post("/enhance-pro-sum", protect, enhanceProfessionalSummary);

// --- POST /api/ai/enhance-job-desc ---
// Enhances a specific job description bullet point using the LLM.
// Requires authentication (`protect`).
aiRouter.post("/enhance-job-desc", protect, enhanceJobDescription);

// --- POST /api/ai/upload-resume ---
// Parses raw resume text (uploaded document) using the LLM and saves it to the database.
// Requires authentication (`protect`).
aiRouter.post("/upload-resume", protect, uploadResume);

export default aiRouter;
