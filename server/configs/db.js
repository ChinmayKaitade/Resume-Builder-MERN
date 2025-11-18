import mongoose from "mongoose";

/**
 * @fileoverview Database Connection Module 💾
 * Establishes and manages the connection to the MongoDB database using Mongoose.
 * This module is designed to ensure the application fails fast if the database
 * connection cannot be established or is incorrectly configured.
 */
const connectDB = async () => {
  try {
    // --- Connection Event Listeners ---

    // Listen for a successful connection event and log a confirmation message.
    mongoose.connection.on("connected", () => {
      console.log("Database connected Successfully!");
    });

    // SUGGESTION: Add listeners for 'error' and 'disconnected' events for robust monitoring.
    /*
    mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err.message);
    });
    
    mongoose.connection.on("disconnected", () => {
        console.log("MongoDB disconnected. Attempting reconnection...");
    });
    */

    // --- Configuration ---

    // Retrieve the MongoDB URI from the environment variables.
    let mongodbURI = process.env.MONGODB_URI;
    // Define the application's database name.
    const projectName = "resume-builder";

    // --- Input Validation ---

    if (!mongodbURI) {
      console.error(
        "MONGODB_URI environment variable not set. Please check your .env file."
      );
      // Exit process immediately if the URI is missing (Fail Fast principle).
      process.exit(1);
    }

    // --- URI Formatting for Robustness ---

    // Remove trailing slash if it exists before appending the database name,
    // ensuring a clean URI format (e.g., 'mongodb://host:port/db_name').
    if (mongodbURI.endsWith("/")) {
      mongodbURI = mongodbURI.slice(0, -1);
    }

    // --- Attempt Connection ---

    // Establish the connection using the corrected URI and appended database name.
    // NOTE: Passing the database name in the URI string is the standard practice.
    await mongoose.connect(`${mongodbURI}/${projectName}`);
  } catch (error) {
    // --- Error Handling ---

    // Log detailed error and exit process if the initial connection attempt fails.
    console.error(
      "Connection Failed!, Error while connecting to MongoDB:",
      error.message || error
    );
    // Exit process immediately on failure to prevent the server from starting in a broken state.
    process.exit(1);
  }
};

export default connectDB;
