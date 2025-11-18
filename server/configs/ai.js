import OpenAI from "openai";

/**
 * @fileoverview AI Client Configuration 🤖
 * Initializes the OpenAI client instance for making API calls (e.g., chat, completions).
 *
 * NOTE ON MISMATCH: The imported library is 'openai', but the environment variables
 * use 'GEMINI_API_KEY' and 'OPENAI_BASE_URL'.
 *
 * - If you intend to use the OpenAI API, use process.env.OPENAI_API_KEY and the default baseURL.
 * - If you intend to use the Google Gemini API, you must import the correct library
 * (e.g., `@google/genai`) and configure it using the correct process.env.GEMINI_API_KEY.
 * The current setup likely points the OpenAI SDK to a custom Gemini-compatible
 * proxy endpoint, which should be explicitly noted.
 */
const ai = new OpenAI({
  // Security: Retrieves the API key from a secure environment variable.
  // Using GEMINI_API_KEY suggests this key is for a Gemini service, implying
  // the client is configured to talk to a proxy or a Gemini-compatible endpoint.
  apiKey: process.env.GEMINI_API_KEY,

  // Custom Base URL: Overrides the default OpenAI endpoint (api.openai.com).
  // This is required if routing through a proxy, a self-hosted solution, or a
  // service that wraps a different LLM (like Gemini) behind an OpenAI-compatible interface.
  baseURL: process.env.OPENAI_BASE_URL,
});

export default ai;
