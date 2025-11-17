import React, { useEffect, useState } from "react";
// Hook to access parameters from the current route URL (e.g., /view/:resumeId).
import { useParams } from "react-router-dom";
// Local dummy data (to be replaced by API calls in production).
import { dummyResumeData } from "../assets/assets";
// Component used to render the formatted resume document.
import ResumePreview from "../components/ResumePreview";
// Component to display while data is being fetched.
import Loader from "../components/Loader";
// Import icons for UI elements (e.g., Not Found page link).
import { ArrowLeftIcon, FileBadge } from "lucide-react";

/**
 * @component Preview 📄
 * @description Renders a read-only preview of a single resume based on the
 * ID provided in the URL parameters. Handles loading, display, and 'Not Found' states.
 */
const Preview = () => {
  // Destructure the resumeId from the URL parameters (e.g., from /view/123).
  const { resumeId } = useParams();

  // --- State Management ---

  // Flag to manage the data fetching status.
  const [isLoading, setIsLoading] = useState(true);
  // Stores the fetched resume object data.
  const [resumeData, setResumeData] = useState(null);

  // --- Data Fetching Logic ---

  /**
   * @async
   * @function loadResume
   * Fetches the specific resume data corresponding to the resumeId from the URL.
   * NOTE: In production, this would be an API call (e.g., GET /api/resumes/{resumeId}).
   */
  const loadResume = async () => {
    // Simulate fetching data by searching the dummy data array.
    const foundResume = dummyResumeData.find(
      (resume) => resume._id === resumeId
    );

    // Set the found resume data, or null if not found.
    setResumeData(foundResume || null);

    // Once the data attempt is complete (success or failure), stop loading.
    setIsLoading(false);
  };

  // --- Side Effects (useEffect) ---

  /**
   * useEffect Hook: Runs once on component mount to initiate the data loading process.
   * Dependency array is empty ([]).
   */
  useEffect(() => {
    loadResume();
  }, []);

  // --- Conditional Rendering ---

  // 1. Render the actual Resume Preview if resumeData is successfully loaded.
  return resumeData ? (
    <div className="bg-slate-100">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template} // Pass selected template type
          accentColor={resumeData.accent_color} // Pass user-selected accent color
          className="py-4 bg-white"
        />
      </div>
    </div>
  ) : (
    // 2. Render Loading or Not Found states
    <div>
      {isLoading ? (
        // Renders the Loader component while data is being fetched.
        <Loader />
      ) : (
        // Renders the "Not Found" message if isLoading is false AND resumeData is null.
        <div
          className="flex flex-col items-center justify-center h-screen
        "
        >
          <FileBadge size={150} className="text-slate-400 mb-4" />
          <p className="text-center text-6xl text-slate-400 font-medium">
            Resume Not Found !
          </p>
          {/* Link back to the main application area */}
          <a
            href="/"
            className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center
             transition-colors"
          >
            <ArrowLeftIcon className="mr-2 size-4" />
            Go to Homepage
          </a>
        </div>
      )}
    </div>
  );
};

export default Preview;
