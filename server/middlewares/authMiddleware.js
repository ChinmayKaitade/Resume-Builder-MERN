import jwt from "jsonwebtoken"; // Library for verifying JSON Web Tokens.

/**
 * @fileoverview Authentication Middleware (protect) 🛡️
 * Middleware function that verifies the presence and validity of a JWT in the
 * request header. If valid, it extracts the user ID and attaches it to the
 * request object (`req.userId`) for use in subsequent controllers.
 *
 * NOTE: This function expects to receive the `next` function as an argument,
 * which is necessary for Express middleware to pass control to the next handler.
 * Assuming the signature is `(req, res, next)`.
 */
const protect = async (req, res, next) => {
  // Added 'next' as a parameter
  // Retrieve the token from the Authorization header.
  // NOTE: This usually expects the header format to be "Bearer <token>".
  // The current logic assumes the token IS the header value, which works if the client doesn't use "Bearer".
  // For production, consider splitting the header: const token = req.headers.authorization?.split(' ')[1];
  const token = req.headers.authorization;

  // --- Step 1: Check for Token Presence ---
  if (!token) {
    // 401 Unauthorized status indicates authentication is required but has failed or not been provided.
    return res.status(401).json({
      message: "Unauthorized: Missing authentication token.",
    });
  }

  try {
    // --- Step 2: Verify Token Validity ---
    // Decrypts and verifies the token against the secret key defined in environment variables (CRITICAL).
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // --- Step 3: Attach User ID and Pass Control ---

    // Attach the verified user's ID (from the token payload) to the request object.
    // This allows controllers to identify the authenticated user (e.g., req.userId).
    req.userId = decoded.userId;

    // Pass control to the next middleware or route handler.
    next();
  } catch (error) {
    // --- Step 4: Handle Invalid Token Errors ---

    // This block catches errors like token expiration, invalid signature, or malformed tokens.
    console.error("JWT Verification Failed:", error.message);

    // 401 Unauthorized status is returned for an invalid token.
    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token.",
    });
  }
};

export default protect;
