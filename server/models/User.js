import mongoose from "mongoose";
import bcrypt from "bcrypt"; // Library used for password comparison (though usually used for hashing before saving).

/**
 * @fileoverview User Mongoose Schema 👤
 * Defines the schema and model for user accounts, including security and authentication fields.
 * This is a fundamental component for managing user sessions and data ownership.
 */
const UserSchema = new mongoose.Schema(
  {
    // User's name (required for registration).
    name: {
      type: String,
      required: true,
      trim: true, // SUGGESTION: Remove surrounding whitespace.
    },
    // User's email (required and must be unique for login identity).
    email: {
      type: String,
      required: true,
      unique: true, // CRITICAL: Ensures no two users share the same email.
      lowercase: true, // SUGGESTION: Standardize case for consistent lookup.
      trim: true,
    },
    // Hashed password string.
    password: {
      type: String,
      required: true,
      select: false, // SUGGESTION: Prevent the password hash from being returned by default in queries (e.g., User.find()).
    },
  },
  {
    // Schema Options
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields.
  }
);

// --- Instance Method ---

/**
 * @method comparePassword
 * Compares a plaintext password provided during login with the stored hashed password.
 * This method is called on a Mongoose document instance (e.g., user.comparePassword('12345')).
 *
 * NOTE: The implementation uses `bcrypt.compareSync`. While correct, typically
 * this logic is implemented in the controller using the asynchronous `bcrypt.compare`
 * for non-blocking I/O, as implemented in your user controller file.
 *
 * @param {string} password - The plaintext password input from the user.
 * @returns {boolean} True if the passwords match, false otherwise.
 */
UserSchema.methods.comparePassword = function (password) {
  // Use bcrypt's comparison function to verify the plaintext input against the hash.
  return bcrypt.compareSync(password, this.password);
};

// Create and export the Mongoose Model
const User = mongoose.model("User", UserSchema);

export default User;
