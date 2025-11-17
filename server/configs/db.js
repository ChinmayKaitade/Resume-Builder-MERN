import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Listen for successful connection
    mongoose.connection.on("connected", () => {
      console.log("Database connected Successfully!");
    });

    let mongodbURI = process.env.MONGODB_URI;
    const projectName = "resume-builder";

    if (!mongodbURI) {
      console.error(
        "MONGODB_URI environment variable not set. Please check your .env file."
      );
      // Exit if the URI is missing
      process.exit(1);
    }

    // Remove trailing slash if it exists before appending project name
    if (mongodbURI.endsWith("/")) {
      mongodbURI = mongodbURI.slice(0, -1);
    }

    // CRITICAL FIX: Use the local variable 'mongodbURI' instead of the undefined 'MONGODB_URI'
    await mongoose.connect(`${mongodbURI}/${projectName}`);
  } catch (error) {
    // Log detailed error and exit process for server robustness
    console.error(
      "Connection Failed!, Error while connecting to MongoDB:",
      error.message || error
    );
    process.exit(1);
  }
};

export default connectDB;
