import express from "express";
import cors from "cors";
// This line loads variables from your .env file into process.env
import "dotenv/config";
import connectDB from "./configs/db.js";

const app = express();
// PORT is read dynamically from process.env, defaulting to 3000
const PORT = process.env.PORT || 3000;

// Database Connection - Top-level await is used here
try {
  await connectDB();
} catch (error) {
  // If DB connection fails, the process will typically exit from within connectDB,
  // but adding a catch here for explicit server startup failure handling is good.
  console.error("Server failed to start due to database connection error.");
}

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(`<h1>Server is running on Port ${PORT}</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
