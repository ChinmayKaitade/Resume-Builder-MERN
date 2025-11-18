import express from "express"; // Import the Express framework for building the server.
import cors from "cors"; // Middleware for enabling Cross-Origin Resource Sharing.
// Load environment variables from the .env file into process.env (CRITICAL).
import "dotenv/config";
import connectDB from "./configs/db.js"; // Import the MongoDB connection function.
// Import route handlers for different resource domains.
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

/**
 * @fileoverview Main Application Entry Point 🚀
 * Initializes the Express server, connects to the database, configures global
 * middleware, and mounts all API routes.
 */
const app = express();
// Define the server port, prioritizing the environment variable (`.env` or hosting platform)
// and falling back to a standard development port (3000).
const PORT = process.env.PORT || 3000;

// --- 1. Database Connection (Asynchronous Startup) ---

// Attempt to connect to MongoDB. Using top-level await blocks subsequent execution
// until connection is established or fails.
try {
  await connectDB();
} catch (error) {
  // If connection fails, log the error explicitly. The process should ideally exit from within connectDB.
  console.error("Server failed to start due to database connection error.");
  // NOTE: If connectDB doesn't exit the process on failure, you should call process.exit(1) here.
}

// --- 2. Global Middleware Setup ---

// Middleware to parse incoming requests with JSON payloads (e.g., from POST/PUT requests).
app.use(express.json());
// Enable CORS for all routes (CRITICAL for allowing frontends on different domains to connect).
app.use(cors());

// --- 3. Root Endpoint (Health Check) ---

// Simple GET route for a basic server health check/status message.
app.get("/", (req, res) => {
  res.send(`<h1>Server is running on Port ${PORT}</h1>`);
});

// --- 4. Route Mounting ---

// Mount the router modules under their respective base paths (API versioning).
// Traffic to /api/users/* is handled by userRouter.
app.use("/api/users", userRouter);
// Traffic to /api/resumes/* is handled by resumeRouter.
app.use("/api/resumes", resumeRouter);
// Traffic to /api/ai/* is handled by aiRouter.
app.use("/api/ai", aiRouter);

// --- 5. Start the Server ---

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
