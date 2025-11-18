import multer from "multer";

/**
 * @fileoverview Multer Configuration 📤
 * Configures the Multer middleware for handling multipart/form-data (file uploads).
 */

// --- Storage Configuration ---

/**
 * NOTE: Setting storage to `multer.diskStorage({})` (with an empty object)
 * uses the default behavior, which stores files in the operating system's
 * default temporary directory without specifying a destination or filename.
 *
 * CRITICAL SUGGESTION: For better control and production reliability, you should
 * explicitly define a `destination` and a `filename` function here.
 *
 * EXAMPLE (using memoryStorage for external upload services like ImageKit/S3):
 * const storage = multer.memoryStorage();
 */
const storage = multer.diskStorage({});

// --- Multer Instance ---

/**
 * Initializes the Multer middleware instance using the defined storage engine.
 * This instance is used in Express routes to process incoming files.
 */
const upload = multer({ storage });

export default upload;
