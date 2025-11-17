import express from "express";
import {
  getUserById,
  loginUser,
  registeredUser,
} from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";
import Resume from "../models/Resume.js";

const userRouter = express.Router();

userRouter.post("/register", registeredUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", protect, getUserById);
userRouter.get("/resumes", protect, Resume);

export default userRouter;
