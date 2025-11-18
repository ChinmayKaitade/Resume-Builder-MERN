import ai from "../configs/ai.js"; // Import the configured AI client instance (OpenAI/Gemini proxy).
import Resume from "../models/Resume.js"; // Mongoose model for interacting with the Resume collection.

/**
 * @fileoverview AI Controllers 🧠
 * Contains controllers for leveraging an LLM to assist with resume creation tasks:
 * enhancing summary/job descriptions and parsing raw resume text into structured JSON.
 *
 * NOTE: All controllers assume the AI client (`ai`) is properly configured to handle
 * chat completions (likely pointing to an OpenAI or Gemini API/proxy).
 */

// --- 1. Controller for Enhancing Professional Summary ---
// POST: /apo/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    // Input: The raw summary text provided by the user.
    const { userContent } = req.body;

    // Input Validation: Ensure required fields are present.
    if (!userContent) {
      return res.status(400).json({
        message: "Missing required fields (userContent)",
      });
    }

    // --- LLM API Call for Enhancement ---
    const response = await ai.chat.completions.create({
      // Model selection should come from environment variables for easy switching (e.g., gpt-4, gemini-pro).
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          // System Prompt: Instructs the LLM on its role, task, and output format constraints.
          role: "system",
          content:
            "Your are an expert in resume writing. Your task is to enhance to professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly and only return text no options or anything else.",
        },
        {
          // User Prompt: The actual content to be enhanced.
          role: "user",
          content: userContent,
        },
      ],
    });

    // Extract the enhanced text from the LLM's response.
    const enhancedContent = response.choices[0].message.content;

    // Success Response
    return res.status(200).json({
      enhancedContent,
    });
  } catch (error) {
    // Error Handling: Catch potential network or API errors.
    console.error("AI Summary Enhancement Error:", error);
    return res.status(500).json({
      message: "Failed to enhance summary via AI.",
      error: error.message,
    });
  }
};

// --- 2. Controller for Enhancing Job Description Bullet Points ---
// POST: /apo/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
  try {
    // Input: The raw job description text provided by the user.
    const { userContent } = req.body;

    // Input Validation
    if (!userContent) {
      return res.status(400).json({
        message: "Missing required fields (userContent)",
      });
    }

    // --- LLM API Call for Enhancement ---
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          // System Prompt: Focuses on action verbs, quantifiable results, and brevity.
          role: "system",
          content:
            "Your are an expert in resume writing. Your task is to enhance to professional the job description of a resume. The job description should be only 1-2 sentence also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly and only return text no options or anything else.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    // Extract the enhanced text.
    const enhancedContent = response.choices[0].message.content;

    // Success Response
    return res.status(200).json({
      enhancedContent,
    });
  } catch (error) {
    // Error Handling
    console.error("AI Job Description Enhancement Error:", error);
    return res.status(500).json({
      message: "Failed to enhance job description via AI.",
      error: error.message,
    });
  }
};

// --- 3. Controller for Uploading/Parsing a Resume ---
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
  try {
    // Inputs: Raw text content of the resume, desired title, and user ID from auth middleware.
    const { resumeText, title } = req.body;
    // Security Note: Assuming 'req.userId' is populated by a prior authentication middleware.
    const userId = req.userId;

    // Input Validation
    if (!resumeText) {
      return res.status(400).json({
        message: "Missing required fields (resumeText)",
      });
    }

    // --- Prompt Engineering for Structured Data Extraction (CRITICAL) ---

    const systemPrompt =
      "You are an expert AI agent to extract data from resume.";

    // User Prompt: Includes the raw text and the target JSON schema.
    // NOTE: The JSON schema provided currently contains Mongoose type definitions (e.g., { type: String }).
    // The LLM should be given a clean schema with sample values or just the keys.
    const userPrompt = `extract data from this resume: ${resumeText}
    
    Provide data in the following JSON format with no additional text before or after, using the following schema keys:
    
    {
    "professional_summary": "",
    "skills": ["skill1", "skill2"],
    "personal_info": {
      "image": "",
      "full_name": "",
      "professional": "",
      "email": "",
      "phone": "",
      "location": "",
      "linkedin": "",
      "website": ""
    },
    "experience": [
      {
        "company": "",
        "position": "",
        "start_date": "YYYY-MM",
        "end_date": "YYYY-MM" (or null if is_current is true),
        "description": "",
        "is_current": true/false
      }
    ],
    "projects": [
      {
        "name": "",
        "type": "",
        "description": ""
      }
    ],
    "education": [
      {
        "institution": "",
        "degree": "",
        "field": "",
        "graduation_date": "YYYY-MM",
        "gpa": ""
      }
    ]
    }
    `; // Replaced Mongoose types with clean JSON format guide.

    // --- LLM API Call for JSON Extraction ---
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      // CRITICAL: Request a JSON object response format for reliable parsing.
      response_format: { type: "json_object" },
    });

    // --- Data Processing and Persistence ---

    // Extract the JSON string from the LLM response.
    const extractedData = response.choices[0].message.content;

    // Parse the JSON string into a JavaScript object.
    const parsedData = JSON.parse(extractedData);

    // Create a new Resume document in MongoDB.
    const newResume = await Resume.create({ userId, title, ...parsedData });

    // Success Response: Return the ID of the newly created resume.
    return res.status(200).json({
      resumeId: newResume._id,
    });
  } catch (error) {
    // Error Handling
    console.error("AI Resume Upload/Parse Error:", error);
    // Be careful with error status; 400 might imply client error, 500 implies server/AI error.
    return res.status(500).json({
      message: "Failed to parse and upload resume via AI.",
      error: error.message,
    });
  }
};
