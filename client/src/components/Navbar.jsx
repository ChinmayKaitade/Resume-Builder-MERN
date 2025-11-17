import React from "react";
// Import routing components: Link for declarative navigation, useNavigate for imperative navigation.
import { Link, useNavigate } from "react-router-dom";

/**
 * @component Navbar 🧭
 * @description The main navigation bar component, typically rendered inside the Layout.
 * It provides application branding, a user greeting, and a logout mechanism.
 */
const Navbar = () => {
  // --- Simulated User State ---

  // NOTE: This user object would typically be fetched from a global state management
  // system (e.g., Redux, Context API) or retrieved from a hook provided by an
  // authentication service (e.g., useAuth()).
  const user = { name: "John Doe" };

  // --- Utility Hooks ---

  // Hook instance used for programmatic routing (e.g., redirecting after logout).
  const navigate = useNavigate();

  // --- Handlers ---

  /**
   * @function logoutUser
   * Handles the user logout process.
   * NOTE: In a production app, this function must:
   * 1. Call the logout API endpoint.
   * 2. Clear local storage/cookies (remove authentication token/session ID).
   * 3. Clear global user state.
   * 4. Redirect the user to the home/login page.
   */
  const logoutUser = () => {
    // Current implementation only handles the redirect.
    navigate("/");
  };

  // --- Rendered Component UI ---

  return (
    // Outer container with a drop shadow for visual separation.
    <div className="shadow bg-white">
      {/* Navigation container: Ensures max width and centers content. */}
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all">
        {/* Logo Link: Always redirects to the home page (/). */}
        <Link to="/">
          <img
            src="/logo.svg"
            alt="Resume Builder Logo"
            className="w-11 w-auto"
          />
        </Link>

        {/* User Info and Action Buttons */}
        <div className="flex items-center gap-4 text-sm">
          {/* User Greeting: Dynamically displays the user's name (hidden on small screens). */}
          <p className="max-sm:hidden">Hi, {user?.name}</p>

          {/* Logout Button: Triggers the logout handler */}
          <button
            onClick={logoutUser}
            className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
