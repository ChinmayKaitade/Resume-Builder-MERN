import React from "react";
// Import all available resume templates.
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";

/**
 * @component ResumePreview 🖼️
 * @description The central component responsible for selecting and rendering the
 * correct resume template based on user choice (`template` prop). It ensures the
 * resume is correctly formatted for display and professional PDF export (print media).
 *
 * @param {object} props
 * @param {object} props.data - The complete resume data object.
 * @param {string} props.template - Identifier for the selected template (e.g., 'modern', 'classic').
 * @param {string} props.accentColor - Hex code for the user-defined accent color.
 * @param {string} [props.classes=''] - Optional Tailwind classes to apply to the preview container.
 */
const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  // --- Template Rendering Logic ---

  /**
   * @function renderTemplate
   * Uses a switch statement to dynamically choose the correct template component
   * based on the `template` prop value.
   * @returns {React.Component} The selected template component, populated with props.
   */
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;

      // The default case handles 'classic' (if template is 'classic') or any undefined/unmatched value.
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  // --- Rendered Component UI ---

  return (
    <div className="w-full bg-gray-100">
      {/* Resume Container: The target element for printing */}
      <div
        id="resume-preview" // ID is critical for the print-specific CSS targeting below.
        className={
          // Strip borders and shadows specifically when printing for a clean PDF look.
          "border border-gray-200 print:shadow-none print:border-none" + classes
        }
      >
        {/* Render the selected template component */}
        {renderTemplate()}
      </div>

      {/* --- Print Media Styles (Essential for PDF Export) --- */}
      <style jsx>
        {`
          /* Set standard letter size (8.5in x 11in) and remove default margins */
          @page {
            size: letter;
            margin: 0;
          }
          /* Apply rules only when the browser prints (or exports to PDF) */
          @media print {
            html,
            body {
              width: 8.5in;
              height: 11in;
              overflow: hidden; /* Prevent extra pages */
            }
            /* Hide everything initially */
            body * {
              visibility: hidden;
            }
            /* Make only the resume container visible */
            #resume-preview,
            #resume-preview * {
              visibility: visible;
            }
            /* Position and format the resume container to fill the page exactly */
            #resume-preview {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: auto;
              margin: 0;
              padding: 0;
              /* Ensure print styles override any display-only borders/shadows */
              box-shadow: none !important;
              border: none !important;
            }
          }
        `}
      </style>
      {/*
        NOTE: For production, using a library like Next.js's built-in styled-jsx
        or a dedicated CSS-in-JS solution for the <style jsx> block is necessary.
        If using plain React, this block should be moved to a global CSS file,
        or a library like react-to-print should be used for better component isolation.
      */}
    </div>
  );
};

export default ResumePreview;
