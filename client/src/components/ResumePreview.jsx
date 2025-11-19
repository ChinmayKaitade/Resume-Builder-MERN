import React from "react";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;

      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

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
