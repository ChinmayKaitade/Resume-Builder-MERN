import React from "react";
// Import Lucide icon for the introductory tag.
import { Zap } from "lucide-react";
// Import the Title sub-component for section header standardization.
import Title from "./Title";

/**
 * @component Features 🌟
 * @description Displays the core features of the resume builder, combining a visual
 * image with a list of key benefits. Includes basic hover interactivity.
 */
const Features = () => {
  // State to manage the hover status for interactive styling on the feature list.
  const [isHover, setIsHover] = React.useState(false);

  // --- Rendered Component UI ---

  return (
    // Main container for the features section, setting margins and scroll target.
    <div
      id="features"
      className="flex flex-col items-center my-10 scroll-mt-12"
    >
      {/* Introductory Tag / Badge */}
      <div className="flex items-center gap-2 text-sm text-green-800 bg-green-400/10 rounded-full px-6 py-1.5">
        <Zap width={14} />
        <span>Simple Process</span>
      </div>

      {/* Section Title and Description (reusable component) */}
      <Title
        title="Build your resume"
        description="Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and features."
      />

      {/* Content Grid: Image on one side, features list on the other */}
      <div className="flex flex-col md:flex-row items-center xl:-mt-10">
        {/* Feature Image / Mockup */}
        <img
          className="max-w-2xl w-full xl:-ml-32"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
          alt="Illustration showing the resume building interface" // Added descriptive alt text
        />

        {/* Feature List Container with Hover Logic */}
        <div
          className="px-4 md:px-0"
          onMouseEnter={() => setIsHover(true)} // Set hover state to true on entering the list area
          onMouseLeave={() => setIsHover(false)} // Set hover state to false on leaving
        >
          {/* Feature Item 1: Real-Time Analytics (Styling controlled by isHover state) */}
          <div
            className={
              "flex items-center justify-center gap-6 max-w-md group cursor-pointer"
            }
          >
            <div
              className={`p-6 group-hover:bg-violet-100 border border-transparent group-hover:border-violet-300 flex gap-4 rounded-xl transition-colors ${
                // Apply default active styling if no element is currently being hovered over
                !isHover ? "border-violet-300 bg-violet-100" : ""
              }`}
            >
              {/* Embedded SVG Icon (Needs review as it seems unrelated to "Analytics" for a resume builder) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 stroke-violet-600"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
              </svg>
              {/* Feature Text */}
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  Real-Time Analytics
                </h3>
                <p className="text-sm text-slate-600 max-w-xs">
                  Get instant insights into your finances with live dashboards.
                  {/* NOTE: This description text seems mismatched to a resume builder (it discusses finances). */}
                </p>
              </div>
            </div>
          </div>

          {/* Feature Item 2: Bank-Grade Security */}
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
            <div className="p-6 group-hover:bg-green-100 border border-transparent group-hover:border-green-300 flex gap-4 rounded-xl transition-colors">
              {/* Embedded SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 stroke-green-600"
              >
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
              </svg>
              {/* Feature Text */}
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  Bank-Grade Security
                </h3>
                <p className="text-sm text-slate-600 max-w-xs">
                  End-to-end encryption, 2FA, compliance with GDPR standards.
                </p>
              </div>
            </div>
          </div>

          {/* Feature Item 3: Customizable Reports */}
          <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
            <div className="p-6 group-hover:bg-orange-100 border border-transparent group-hover:border-orange-300 flex gap-4 rounded-xl transition-colors">
              {/* Embedded SVG Icon */}
              <svg
                className="size-6 stroke-orange-600"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 15V3" />
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="m7 10 5 5 5-5" />
              </svg>
              {/* Feature Text */}
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">
                  Customizable Reports
                </h3>
                <p className="text-sm text-slate-600 max-w-xs">
                  Export professional, audit-ready financial reports for tax or
                  internal review.
                  {/* NOTE: This description also seems mismatched (it discusses financial reports). */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Global Poppins Font Import (Often better placed in a global CSS file) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    
        * {
            font-family: 'Poppins', sans-serif;
        }
    `}</style>
    </div>
  );
};

export default Features;
