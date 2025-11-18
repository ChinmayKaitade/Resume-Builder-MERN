import ImageKit from "@imagekit/nodejs";

/**
 * @fileoverview ImageKit Client Configuration 🖼️
 * Initializes the ImageKit client instance for server-side operations, such as
 * file uploading, deletion, and generating authenticated URL signatures.
 */
const imageKit = new ImageKit({
  // The private API key is essential for server-side actions (upload, delete).
  // It MUST be securely stored in an environment variable (e.g., .env file).
  // Security: Using bracket notation process.env["KEY"] is functionally equivalent
  // to dot notation process.env.KEY, but ensures key names with special characters are handled.
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],

  // NOTE: You must also include the publicKey and urlEndpoint for full functionality,
  // especially if generating authentication parameters for front-end uploads.
  // Add these environment variables for a complete setup:
  // publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  // urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default imageKit;
