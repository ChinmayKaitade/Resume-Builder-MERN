import mongoose from "mongoose";

/**
 * @fileoverview Resume Mongoose Schema 📁
 * Defines the comprehensive schema for storing a user's resume data in MongoDB.
 * The schema uses a single document to capture all sections, including embedded arrays
 * for repeatable entries like experience and education.
 */
const ResumeSchema = new mongoose.Schema(
  {
    // --- Document Relationship and Metadata ---

    // Reference to the User who owns this resume (Authentication/Authorization).
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Ensures data integrity and enables population.
      required: true, // CRITICAL: A resume must belong to a user.
    },
    // General title for the resume (used in the Dashboard).
    title: {
      type: String,
      default: "Untitled Resume",
      trim: true,
    },
    // Flag to control public accessibility (for share links).
    public: {
      type: Boolean,
      default: false,
    },
    // Template ID selected by the user (e.g., 'classic', 'modern').
    template: {
      type: String,
      default: "classic",
      enum: ["classic", "modern", "minimal", "minimal-image"], // SUGGESTION: Use enum for template IDs.
    },
    // User-selected hex code for theme color.
    accent_color: {
      type: String,
      default: "#3b82f6",
    },

    // --- Content Sections (Top Level) ---

    professional_summary: {
      type: String,
      default: "",
    },
    // NOTE: Storing 'skills' as a single String is unconventional.
    // SUGGESTION: Change to { type: [String], default: [] } for easier querying and mapping.
    skills: {
      type: String,
    },

    // --- Embedded Sub-Document: Personal Information ---
    personal_info: {
      image: { type: String, default: "" }, // URL to the profile picture (ImageKit link).
      full_name: { type: String, default: "" },
      profession: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      website: { type: String, default: "" },
    },

    // --- Embedded Array: Experience ---
    experience: [
      {
        company: { type: String, required: true }, // Added required for key fields.
        position: { type: String, required: true },
        start_date: { type: String }, // Format: YYYY-MM
        end_date: { type: String }, // Format: YYYY-MM
        description: { type: String }, // Job description/bullet points.
        is_current: { type: Boolean, default: false },
      },
    ],

    // --- Embedded Array: Projects ---
    projects: [
      {
        name: { type: String, required: true },
        type: { type: String },
        description: { type: String },
      },
    ],

    // --- Embedded Array: Education ---
    education: [
      {
        institution: { type: String, required: true },
        degree: { type: String },
        field: { type: String },
        graduation_date: { type: String }, // Format: YYYY-MM
        gpa: { type: String },
      },
    ],
  },
  {
    // Schema Options
    timestamps: true, // Automatically adds createdAt and updatedAt fields.
    minimize: false, // Prevents Mongoose from stripping empty objects (e.g., if personal_info is empty).
  }
);

// Create the Mongoose Model
const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;
