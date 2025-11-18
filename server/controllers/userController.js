import bcrypt from "bcrypt"; // Library for password hashing.
import User from "../models/User.js"; // Mongoose model for User documents.
import jwt from "jsonwebtoken"; // Library for creating and verifying JSON Web Tokens.
import Resume from "../models/Resume.js"; // Mongoose model for Resume documents.

/**
 * @fileoverview User Controllers 🔐
 * Manages authentication (Registration, Login) and user-specific data retrieval (Profile, Resumes).
 * Relies on `req.userId` being set by authentication middleware for secured endpoints.
 */

// --- Utility Function ---

/**
 * @function generateToken
 * Creates a JSON Web Token (JWT) containing the user ID.
 * @param {string} userId - The MongoDB ObjectId of the user.
 * @returns {string} The signed JWT string.
 */
const generateToken = (userId) => {
  // Use a secret key from environment variables (CRITICAL for security).
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    // Set token expiration time (e.g., 7 days).
    expiresIn: "7d",
  });

  return token;
};

// --- 1. User Registration ---
// POST: /api/users/register
export const registeredUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Input Validation: Check for required fields.
    if (!name || !email || !password) {
      // Use 400 Bad Request for missing client input.
      return res.status(400).json({
        message: "Missing required fields (name, email, password)",
      });
    }

    // Check if user already exists (Prevents duplicate accounts).
    const user = await User.findOne({ email });
    if (user) {
      // Use 409 Conflict is also suitable, but 400 is common for this logic.
      return res.status(400).json({
        message: "User already exists with this email address",
      });
    }

    // Hash Password (Security: CRITICAL step before saving password).
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document in the database.
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate authentication token for the new user.
    const token = generateToken(newUser._id);

    // Security: Remove the password field from the response object before sending it to the client.
    newUser.password = undefined;

    // Success: 201 Created status.
    return res.status(201).json({
      message: "User Created Successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    // Catch database or hashing errors. Use 500 for server-side issues.
    console.error("Registration Error:", error);
    return res.status(500).json({
      message: "Registration failed due to a server error.",
      error: error.message,
    });
  }
};

// --- 2. User Login ---
// POST: /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists by email.
    const user = await User.findOne({ email });
    if (!user) {
      // Security: Use a generic error message to prevent email enumeration.
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    // Check if password is correct (Assuming comparePassword is a Mongoose instance method).
    // SUGGESTION: This should be implemented using `bcrypt.compare(password, user.password)`.
    const isPasswordCorrect = await bcrypt.compare(password, user.password); // Using bcrypt directly

    if (!isPasswordCorrect) {
      // Security: Use a generic error message.
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    // Generate token and clean up the user object.
    const token = generateToken(user._id);
    user.password = undefined; // Do not return the hashed password.

    // Success: 200 OK status.
    return res.status(200).json({
      message: "Login Successful!",
      token,
      user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Login failed due to a server error.",
      error: error.message,
    });
  }
};

// --- 3. Get User Profile Data ---
// GET: /api/users/data
// Requires authentication middleware to populate req.userId.
export const getUserById = async (req, res) => {
  try {
    // Authentication: Get the validated user ID from middleware.
    const userId = req.userId;

    // Fetch user document.
    const user = await User.findById(userId);
    if (!user) {
      // If user is not found (e.g., deleted account), respond with 404.
      return res.status(404).json({
        message: "User not found!",
      });
    }

    // Clean up the user object.
    user.password = undefined;

    // Success: 200 OK status.
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Get User Profile Error:", error);
    // 500 for server/database error.
    return res.status(500).json({
      message: "Failed to fetch user profile.",
      error: error.message,
    });
  }
};

// --- 4. Get All User Resumes ---
// GET: /api/users/resumes
// Requires authentication middleware to populate req.userId.
export const getUserResumes = async (req, res) => {
  try {
    // Authentication: Get the validated user ID from middleware.
    const userId = req.userId;

    // Retrieve all resumes associated with this user ID.
    // NOTE: Consider adding pagination if the number of resumes could grow very large.
    const resumes = await Resume.find({ userId });

    // Success: 200 OK status.
    return res.status(200).json({
      resumes,
    });
  } catch (error) {
    console.error("Get User Resumes Error:", error);
    return res.status(500).json({
      message: "Failed to fetch user resumes.",
      error: error.message,
    });
  }
};
