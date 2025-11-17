import React, { useEffect, useState } from "react";
// Import necessary hooks for route parameters and linking/navigation.
import { Link, useParams } from "react-router-dom";
// Local dummy data source (placeholder for actual API/DB integration).
import { dummyResumeData } from "../assets/assets";
// Import icons for section navigation and utility buttons from Lucide.
import {
  ArrowLeft,
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOff,
  EyeOffIcon,
  FileText,
  Folder,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";

// Import all child form components for editing different resume sections.
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";

/**
 * @component ResumeBuilder 🛠️
 * @description The main interface for editing a user's resume. It manages the complete
 * resume data state, controls step-by-step form navigation, and updates the
 * live preview in real-time.
 */
const ResumeBuilder = () => {
  // Get the unique identifier of the resume being edited from the URL.
  const { resumeId } = useParams();

  // --- Core Resume State Management ---

  // Comprehensive state object holding ALL resume data, initialized with defaults.
  // This state object is passed down to all form and preview components.
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {}, // Object for contact details, etc.
    professional_summary: "", // String or rich text for the summary.
    experience: [], // Array of job experience objects.
    education: [], // Array of education history objects.
    project: [], // Array of project objects.
    skills: [], // Array of skill objects.
    template: "classic", // Template style identifier.
    accent_color: "#3b82f6", // Primary color theme (Tailwind blue-500 default).
    public: false, // Visibility status (private or public shareable link).
  });

  // --- Data Loading ---

  /**
   * @async
   * @function loadExistingResume
   * Fetches the full resume data based on the URL's resumeId and updates the state.
   */
  const loadExistingResume = async () => {
    // NOTE: Replace this with an API call (e.g., GET /api/resumes/{resumeId}).
    const resume = dummyResumeData.find((resume) => resume._id === resumeId);

    if (resume) {
      // Set the fetched data to the main state.
      setResumeData(resume);
      // Update the browser tab title for better UX.
      document.title = resume.title;
    }
    // SUGGESTION: If resume is null, handle the 'Not Found' case here (e.g., navigate to 404).
  };

  // --- UI/Navigation State ---

  // Controls which step (form section) is currently visible in the left panel.
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  // State for a specific UI feature, likely related to photo manipulation (e.g., removing photo background).
  const [removeBackground, setRemoveBackground] = useState(false);

  // Array defining the structure and order of the builder steps/sections.
  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: Folder },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  // Helper variable to easily reference the currently selected section object.
  const activeSection = sections[activeSectionIndex];

  // --- Side Effects (useEffect) ---

  /**
   * useEffect Hook: Runs once on component mount to load the resume data.
   */
  useEffect(() => {
    loadExistingResume();
  }, []);

  // SUGGESTION: Consider adding another useEffect to automatically save resumeData
  // whenever it changes (debounced save functionality).

  // --- Utility Handlers ---

  /**
   * @function changeResumeVisibility
   * Toggles the 'public' status of the resume.
   * This should trigger a database update to change the resume's shareability.
   */
  const changeResumeVisibility = async () => {
    setResumeData({ ...resumeData, public: !resumeData.public });
    // NOTE: Add API call here to persist the visibility change to the backend.
  };

  /**
   * @function handleShare
   * Generates the public URL and attempts to use the native Web Share API.
   * Falls back to an alert if native share is not supported.
   */
  const handleShare = () => {
    // Constructs the full view URL using the base domain and the current resume ID.
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = frontendUrl + "/view/" + resumeId;

    // Use the native Web Share API if available (better mobile integration).
    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      // SUGGESTION: Replace alert() with a custom modal or toast notification
      // that displays the URL for manual copying.
      alert("Share not supported on this browser.");
    }
  };

  /**
   * @function downloadResume
   * Triggers the browser's print dialog, which is commonly used to generate a PDF.
   */
  const downloadResume = () => {
    window.print();
  };

  // --- Rendered Component UI ---

  return (
    <div>
      {/* Back to Dashboard Link */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        {/* Main Grid Layout: 5 columns for form, 7 columns for preview on large screens */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel - Form Editor */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/* Progress Bar (Visual indicator of current section progress) */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-200"
                style={{
                  // Calculate width based on current index vs total sections
                  width: `${
                    (activeSectionIndex * 100) / (sections.length - 1)
                  }%`,
                }}
              />

              {/* Section Configuration and Navigation Controls */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div className="flex items-center gap-2">
                  {/* Template Selector Component */}
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />

                  {/* Color Picker Component */}
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) => {
                      // Callback updates the accent_color in the main state
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }));
                    }}
                  />
                </div>

                {/* Previous/Next Step Buttons */}
                <div className="flex items-center">
                  {/* Previous Button (Hidden on first step) */}
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prevIndex) =>
                          // Decrement index, ensuring it doesn't go below 0
                          Math.max(prevIndex - 1, 0)
                        )
                      }
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                      disabled={activeSectionIndex === 0}
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}

                  {/* Next Button (Disabled on last step) */}
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        // Increment index, ensuring it doesn't exceed the last section
                        Math.min(prevIndex + 1, sections.length - 1)
                      )
                    }
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                      activeSectionIndex === sections.length - 1 && "opacity-50" // Dim the button on the last step
                    }`}
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* Form Content: Conditionally renders the active form component */}
              <div className="space-y-6">
                {/* Personal Info Form */}
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      // Updater function to merge changes into the specific sub-object
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {/* Professional Summary Form */}
                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      // Updater function for the summary string
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}

                {/* Experience Form (Array of objects) */}
                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      // Updater function for the experience array
                      setResumeData((prev) => ({
                        ...prev,
                        experience: data,
                      }))
                    }
                  />
                )}

                {/* Education Form (Array of objects) */}
                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      // Updater function for the education array
                      setResumeData((prev) => ({
                        ...prev,
                        education: data,
                      }))
                    }
                  />
                )}

                {/* Project Form (Array of objects) */}
                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={(data) =>
                      // Updater function for the project array
                      setResumeData((prev) => ({
                        ...prev,
                        project: data,
                      }))
                    }
                  />
                )}

                {/* Skills Form (Array of objects/strings) */}
                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      // Updater function for the skills array
                      setResumeData((prev) => ({
                        ...prev,
                        skills: data,
                      }))
                    }
                  />
                )}
              </div>

              {/* Save Button */}
              <button className="bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-gray-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm">
                Save Changes
              </button>
            </div>
          </div>

          {/* Right Panel - Live Resume Preview */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-fill">
              {/* Action Buttons (Share, Visibility, Download) - positioned absolutely over the preview */}
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                {/* Share Button (Only visible if resume is public) */}
                {resumeData.public && (
                  <button
                    onClick={handleShare}
                    className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors"
                  >
                    <Share2Icon className="size-4" /> Share
                  </button>
                )}

                {/* Visibility Toggle Button (Public/Private) */}
                <button
                  onClick={changeResumeVisibility}
                  className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 ring-purple-300 rounded-l-2xl hover:ring transition-colors"
                >
                  {resumeData.public ? (
                    <EyeIcon className="size-4" /> // Eye open if public
                  ) : (
                    <EyeOffIcon className="size-4" /> // Eye closed if private
                  )}

                  {resumeData.public ? "Public" : "Private"}
                </button>

                {/* Download/Print Button */}
                <button
                  onClick={downloadResume}
                  className="flex items-center gap-2 px-6 py-2 text-xs
                  bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-red-300 hover:ring transition-colors"
                >
                  <DownloadIcon className="size-4" /> Download
                </button>
              </div>
            </div>

            {/* Resume Preview Component: Renders the document based on current state */}
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
