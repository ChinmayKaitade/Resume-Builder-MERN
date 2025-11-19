import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";

const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured in environment variables.");
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};


export const registeredUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Missing required fields (name, email, password)",
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email address",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);

    const userResponse = newUser.toObject();
    delete userResponse.password;

    return res.status(201).json({
      message: "User Created Successfully",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      message: "Registration failed due to a server error.",
      error: error.message,
    });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Missing required fields (email, password)",
      });
    }


    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    const token = generateToken(user._id);

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      message: "Login Successful!",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Login failed due to a server error.",
      error: error.message,
    });
  }
};


export const getUserById = async (req, res) => {
  try {
    const userId = req.userId; 

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Get User Profile Error:", error);
    return res.status(500).json({
      message: "Failed to fetch user profile.",
      error: error.message,
    });
  }
};


export const getUserResumes = async (req, res) => {
  try {
    const userId = req.userId; 

    const resumes = await Resume.find({ userId });

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
