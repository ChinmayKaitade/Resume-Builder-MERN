import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};

// controller for user registration
// POST: /api/users/register
export const registeredUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check of required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // create new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // return success message
    const token = generateToken(newUser._id);
    newUser.password = undefined;

    return res.status(201).json({
      message: "User Created Successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// controller for user login
// POST: /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    // check if password is correct
    if (!user.comparePassword(password)) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    // return success message
    const token = generateToken(user._id);
    user.password = undefined;

    return res.status(200).json({
      message: "Login Successful!",
      token,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// controller for getting user by id
// GET: /api/users/data
export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;

    // check of user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    // return user
    user.password = undefined;

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
