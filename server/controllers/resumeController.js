import ImageKit from "../configs/imageKit.js"; // ImageKit SDK client instance.
import Resume from "../models/Resume.js"; // Mongoose model for the Resume document.
import fs from "fs"; // Node's file system module for reading/deleting local files.

/**
 * @fileoverview Resume Controllers 📄
 * Contains controllers for managing all resume lifecycle operations (CRUD).
 * All authenticated controllers rely on `req.userId` being populated by
 * preceding authentication middleware.
 */

// --- 1. Create New Resume ---
// POST: /api/resumes/create
export const createResume = async (req, res) => {
  try {
    // Security: Get authenticated user ID from the request object.
    const userId = req.userId;
    const { title } = req.body;

    // Validation: Add checks for required 'title' here if needed.

    // Create new resume document in MongoDB.
    const newResume = await Resume.create({ userId, title });

    // Success: 201 Created status code is appropriate for resource creation.
    return res
      .status(201)
      .json({ message: "Resume Created Successfully!", resume: newResume });
  } catch (error) {
    // Error Handling: 500 Internal Server Error for database issues.
    console.error("Error creating resume:", error);
    return res.status(500).json({ message: error.message });
  }
};

// --- 2. Delete Resume ---
// DELETE: /api/resumes/delete/:resumeId (Typically uses DELETE and the ID in URL params)
// NOTE: The endpoint comment says POST, but deletion should be DELETE.
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    // Extract ID from URL parameters.
    const { resumeId } = req.params;

    // Delete document: Use userId for security (ensures user can only delete their own resumes).
    const result = await Resume.findOneAndDelete({ userId, _id: resumeId });

    if (!result) {
      return res
        .status(404)
        .json({ message: "Resume Not Found or Unauthorized." });
    }

    // Success: 200 OK or 204 No Content for successful deletion.
    return res.status(200).json({ message: "Resume Deleted Successfully!" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    return res.status(500).json({ message: error.message });
  }
};

// --- 3. Get User's Resume by ID ---
// GET: /api/resumes/get/:resumeId (Uses GET and ID in URL params)
// NOTE: The endpoint comment says POST, but fetching should be GET.
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    // Fetch document: Use userId for security (only fetch the user's own document).
    const resume = await Resume.findOne({ userId, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume Not Found!" });
    }

    // Clean up internal Mongoose fields before sending to the client.
    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    // Success: 200 OK status.
    // NOTE: The original status code was 201, but 200 is correct for GET requests.
    return res.status(200).json({ resume });
  } catch (error) {
    console.error("Error fetching resume by ID:", error);
    return res.status(500).json({ message: error.message });
  }
};

// --- 4. Get Public Resume by ID (Share Link) ---
// GET: /api/resumes/public/:resumeId (Uses GET and ID in URL params)
// NOTE: The endpoint comment says POST, but fetching should be GET.
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    // CRITICAL: Only retrieve the resume if both the ID matches AND the 'public' flag is true.
    const resume = await Resume.findOne({ public: true, _id: resumeId });

    if (!resume) {
      return res
        .status(404)
        .json({ message: "Resume Not Found or Not Public." });
    }

    // Success: 200 OK status.
    return res.status(200).json({ resume });
  } catch (error) {
    console.error("Error fetching public resume:", error);
    return res.status(500).json({ message: error.message });
  }
};

// --- 5. Update Resume (with Image Upload Logic) ---
// PUT/PATCH: /api/resumes/update/:resumeId (Uses PUT/PATCH and ID in URL params is better)
// NOTE: The endpoint comment says POST, but updating should ideally be PUT/PATCH.
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    // Expects form-data: resumeId in body/params, JSON string of resumeData, optional image file.
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file; // File object provided by Multer middleware.

    // Must parse the resume data string back into a JavaScript object.
    let resumeDataCopy = JSON.parse(resumeData);

    // --- Image Upload Logic ---
    if (image) {
      // 1. Read the temporary local file provided by Multer (diskStorage).
      const imageBufferData = fs.createReadStream(image.path);

      // 2. Upload to ImageKit.
      const response = await ImageKit.files.upload({
        file: imageBufferData,
        fileName: `resume-profile-${userId}.png`, // Dynamic, better filename.
        folder: "user-resumes",
        // ImageKit Transformation Logic: w/h=300, focus on face (fo-face), zoom, plus optional background removal.
        transformation: {
          pre:
            "w-300, h-300, fo-face, z-0.75" +
            (removeBackground ? ",e-bgremove" : ""), // Appends background removal flag if requested.
        },
      });

      // CRITICAL: Clean up the temporary file created by Multer.
      fs.unlink(image.path, (err) => {
        if (err) console.error("Error deleting local temp file:", err);
      });

      // 3. Update the image URL in the resume data before saving to MongoDB.
      resumeDataCopy.personal_info.image = response.url;
    }

    // --- Database Update ---
    // Use userId for security (user can only update their own resume).
    const resume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },
      // Update with the new data (including the new image URL if uploaded).
      { $set: resumeDataCopy }, // Use $set for clarity and safety in updates.
      {
        new: true, // Return the updated document.
      }
    );

    // Success: 200 OK status.
    return res.status(200).json({
      message: "Saved Successfully!",
      resume,
    });
  } catch (error) {
    console.error("Error updating resume:", error);
    // Be careful with error status; 400 implies client data error, 500 implies server/upload error.
    return res.status(500).json({ message: error.message });
  }
};
