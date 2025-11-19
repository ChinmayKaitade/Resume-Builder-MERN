import express from "express";
import {
  getUserById,
  getUserResumes,
  loginUser,
  registeredUser,
} from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registeredUser);

userRouter.post("/login", loginUser);

userRouter.get("/data", protect, getUserById);

userRouter.get("/resumes", protect, getUserResumes);

export default userRouter;
