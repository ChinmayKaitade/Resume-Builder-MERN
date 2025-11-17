import React from "react";

/**
 * @component Title 📝
 * @description A reusable, purely presentational component for displaying standardized
 * section headings (H2) and accompanying descriptive text (P) across the application.
 *
 * @param {object} props
 * @param {string} props.title - The main heading text for the section.
 * @param {string} props.description - The subtitle or descriptive text placed below the heading.
 */
const Title = ({ title, description }) => {
  return (
    // Container: Centers the text content and applies vertical spacing.
    <div className="text-center mt-6 text-slate-700">
      {/* Main Heading (Title) */}
      <h2 className="text-3xl sm:text-4xl font-medium">{title}</h2>
      {/* Subtitle/Description */}
      <p className="max-sm max-w-2xl mt-4 text-slate-500">{description}</p>
    </div>
  );
};

export default Title;
