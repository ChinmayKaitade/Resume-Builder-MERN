import React from "react";
// Import the Outlet component from React Router v6.
// Outlet renders the currently matched child route component (the nested content).
import { Outlet } from "react-router-dom";
// Import the application's primary navigation bar component.
import Navbar from "../components/Navbar";

/**
 * @component Layout 🗺️
 * @description Provides the standard application layout structure, which is shared
 * across all nested routes under the '/app' path (or similar parent route).
 * This typically includes persistent elements like the Navbar, Sidebar, and Footer.
 */
const Layout = () => {
  return (
    // Top-level container
    <div>
      {/* Defines the minimum height of the application frame and sets a light background */}
      <div className="min-h-screen bg-gray-50">
        {/* Renders the persistent navigation bar/header that appears on all child routes */}
        <Navbar />

        {/* The core of the nested layout pattern:
          The Outlet component dynamically renders the content of the currently 
          matched child route (e.g., Dashboard, ResumeBuilder, Preview).
          This ensures the Navbar is always displayed above the changing page content.
        */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
