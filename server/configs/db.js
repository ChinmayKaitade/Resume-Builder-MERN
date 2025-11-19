import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected Successfully!");
    });

    let mongodbURI = process.env.MONGODB_URI;
    const projectName = "ResumeBuilder";

    if (!mongodbURI) {
      console.error(
        "MONGODB_URI environment variable not set. Please check your .env file."
      );
      process.exit(1);
    }

    if (mongodbURI.endsWith("/")) {
      mongodbURI = mongodbURI.slice(0, -1);
    }

    await mongoose.connect(`${mongodbURI}/${projectName}`);
  } catch (error) {
    console.error(
      "Connection Failed!, Error while connecting to MongoDB:",
      error.message || error
    );

    process.exit(1);
  }
};

export default connectDB;
