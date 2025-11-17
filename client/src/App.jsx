import React from "react";
// Import page components for routing.
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
// Import essential routing components from React Router v6.
import { Route, Routes } from "react-router-dom";

/**
 * @fileoverview Main application component defining the top-level routing structure.
 * This component uses React Router v6 to map URLs to specific page components,
 * including nested routes for the authenticated application section.
 */
const App = () => {
  return (
    <>
      {/* Routes container component for managing the application's URL paths */}
      <Routes>
        {/* --- Public/Marketing Routes --- */}
        {/* Route for the main marketing or landing page. */}
        <Route path="/" element={<Home />} />

        {/* --- Authenticated Application Routes (Nested) --- */}
        {/* The 'app' path uses the Layout component as a wrapper, which typically
            includes persistent UI elements like headers and navigation.
            The Layout component must contain an <Outlet /> for rendering nested routes. */}
        <Route path="app" element={<Layout />}>
          {/* Index Route: Renders the main Dashboard when the path is exactly '/app'. */}
          <Route index element={<Dashboard />} />
          {/* Builder Route: Route for the resume creation/editing tool.
              It uses a dynamic URL parameter :resumeId to load a specific resume. */}
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
          {/* View Route: Route for viewing the final resume preview.
              It also uses the dynamic URL parameter :resumeId. */}
          <Route path="view/:resumeId" element={<Preview />} />
        </Route>

        {/* --- Authentication Routes --- */}
        {/* Route for user login. */}
        <Route path="login" element={<Login />} />

        {/*
          SUGGESTION: For better user experience, it is highly recommended to add a
          catch-all route at the end to handle 404 (Not Found) errors.
          Example: <Route path="*" element={<NotFoundPage />} />
        */}
      </Routes>
    </>
  );
};

export default App;
