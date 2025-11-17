import React, { useEffect, useState } from "react";
// Import necessary icons from Lucide React for UI consistency.
import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
// Import dummy data and utilities (to be replaced by a real API/database call).
import { dummyResumeData } from "../assets/assets";
// Hook for programmatic navigation using React Router v6.
import { useNavigate } from "react-router-dom";

/**
 * @component Dashboard
 * @description Renders the main user dashboard where resumes are displayed, and
 * actions (Create, Upload, Edit, Delete) can be initiated via modals.
 */
const Dashboard = () => {
  // A set of colors used cyclically to style the resume cards for visual distinction.
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  // --- State Management ---

  // Stores the list of all resumes fetched from the backend/data source.
  const [allResumes, setAllResumes] = useState([]);
  // Boolean flag to control the visibility of the "Create New Resume" modal form.
  const [showCreateResume, setShowCreateResume] = useState(false);
  // Boolean flag to control the visibility of the "Upload Existing Resume" modal form.
  const [showUploadResume, setShowUploadResume] = useState(false);
  // Stores the title input for new or edited resumes within the modals.
  const [title, setTitle] = useState("");
  // Stores the selected file object for the resume upload functionality.
  const [resume, setResume] = useState(null);
  // Stores the ID of the resume currently being edited in the title edit modal.
  const [editResumeId, setEditResumeId] = useState("");

  // Hook instance for routing users programmatically.
  const navigate = useNavigate();

  // --- API / Data Handlers ---

  /**
   * @async
   * @function loadAllResumes
   * Fetches the initial list of resumes for the current user.
   * NOTE: In a production environment, this function should make an asynchronous
   * call to an API endpoint (e.g., Firestore or REST API).
   */
  const loadAllResumes = async () => {
    // Currently loads dummy data for development/demonstration.
    setAllResumes(dummyResumeData);
  };

  /**
   * @async
   * @function createResume
   * Handles the form submission for creating a new resume.
   * On success, closes the modal and navigates the user to the builder page.
   * @param {Event} event - The form submission event.
   */
  const createResume = async (event) => {
    event.preventDefault();
    // Logic to save the new resume (e.g., using 'title' state) would go here.
    setShowCreateResume(false);
    // Navigates to the builder view with a placeholder ID (should be the newly created ID).
    navigate(`/app/builder/resume123`);
  };

  /**
   * @async
   * @function uploadResume
   * Handles the form submission for uploading an existing resume file.
   * On success, closes the modal and navigates to the builder/viewer.
   * @param {Event} event - The form submission event.
   */
  const uploadResume = async (event) => {
    event.preventDefault();
    // Logic to upload 'resume' file and process it would go here.
    setShowUploadResume(false);
    // Navigates to the appropriate builder/viewer view with a placeholder ID.
    navigate(`/app/builder/resume123`);
  };

  /**
   * @async
   * @function editTitle
   * Handles the form submission for updating an existing resume's title.
   * @param {Event} event - The form submission event.
   */
  const editTitle = async (event) => {
    event.preventDefault();
    // Logic to update the resume title using 'editResumeId' and 'title' state.
    // Must close the modal after a successful update.
    // setEditResumeId(""); // Must be called to close the edit modal
  };

  /**
   * @async
   * @function deleteResume
   * Prompts the user for confirmation and deletes the specified resume.
   * NOTE: The use of 'window.confirm' is generally discouraged in production
   * in favor of custom modal components for better UI control and integration.
   * @param {string} resumeId - The unique identifier of the resume to delete.
   */
  const deleteResume = async (resumeId) => {
    //
    // SUGGESTION: Replace window.confirm() with a custom modal for better UI/UX.
    //
    const confirm = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (confirm) {
      // Logic to call the delete API endpoint would go here.
      // Optimistically update the local state to remove the deleted resume.
      setAllResumes((prev) => prev.filter((resume) => resume._id !== resumeId));
    }
  };

  // --- Side Effects (useEffect) ---

  /**
   * useEffect Hook: Runs once on component mount ([]) to load the initial resume data.
   */
  useEffect(() => {
    loadAllResumes();
  }, []);

  // --- Rendered Component UI (Tailwind CSS for styling) ---

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* User Greeting (Hidden on larger screens, assumes it's visible in Layout) */}
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Joe Doe
        </p>

        {/* Action Buttons: Create and Upload */}
        <div className="flex gap-4">
          {/* Button to show the "Create New Resume" modal */}
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
              Create Resume
            </p>
          </button>

          {/* Button to show the "Upload Existing Resume" modal */}
          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-purple-600 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>

        {/* Separator Line */}
        <hr className="border-slate-300 my-6 sm:w-[350px]" />

        {/* Resume List Grid */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {/* Map through all fetched resumes to render individual cards */}
          {allResumes.map((resume, index) => {
            // Cyclically select a base color for the card's theme.
            const baseColor = colors[index % colors.length];

            return (
              // Resume Card: Navigates to the builder when clicked
              <button
                key={index}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  // Apply theme color using linear gradient and border color
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40",
                }}
              >
                {/* Resume Icon */}
                <FilePenLineIcon
                  className="size-7 group-hover:scale-105 transition-all"
                  style={{ color: baseColor }}
                />

                {/* Resume Title */}
                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>

                {/* Last Updated Timestamp */}
                <p
                  className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                  style={{ color: baseColor + "90" }}
                >
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                {/* Edit/Delete Action Icons (Only visible on hover/focus) */}
                <div
                  // Prevents the outer button's navigation from triggering when clicking icons
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 group-hover:flex items-center hidden"
                >
                  {/* Delete Icon */}
                  <TrashIcon
                    onClick={() => {
                      deleteResume(resume._id);
                    }}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                  />

                  {/* Edit Title Icon: Sets state to show the title edit modal */}
                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* --- Modals / Conditional UI --- */}

        {/* Create Resume Modal: Renders only when showCreateResume is true */}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            // Close modal on outside click
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              // Stop propagation to prevent closing the modal when clicking inside
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Create a Resume</h2>

              {/* Title Input */}
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter Resume Title"
                className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
                required
              />

              {/* Submit Button */}
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Create Resume
              </button>

              {/* Close Icon */}
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle(""); // Reset title state on close
                }}
              />
            </div>
          </form>
        )}

        {/* Upload Resume Modal: Renders only when showUploadResume is true */}
        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

              {/* Title Input */}
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter Resume Title"
                className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
                required
              />

              {/* File Upload Area */}
              <div>
                <label
                  htmlFor="resume-input"
                  className="block text-sm text-slate-700"
                >
                  Select Resume File
                  {/* Custom styled file input placeholder */}
                  <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                    {/* Display file name if a file is selected */}
                    {resume ? (
                      <p className="text-green-700">{resume.name}</p>
                    ) : (
                      // Default upload prompt
                      <>
                        <UploadCloudIcon className="size-14 stroke-1" />
                        <p>Upload Resume</p>
                      </>
                    )}
                  </div>
                </label>

                {/* Hidden Native File Input */}
                <input
                  type="file"
                  name="resume-input"
                  id="resume-input"
                  accept=".pdf" // Restricts file selection to PDF files
                  hidden
                  onChange={(e) => setResume(e.target.files[0])}
                />
              </div>

              {/* Submit Button */}
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Upload Resume
              </button>

              {/* Close Icon */}
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle(""); // Reset title state on close
                }}
              />
            </div>
          </form>
        )}

        {/* Edit Title Modal: Renders only when editResumeId is set */}
        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId("")} // Close modal on outside click
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>

              {/* Title Input (pre-populated with current title) */}
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter Resume Title"
                className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
                required
              />

              {/* Submit Button */}
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Update
              </button>

              {/* Close Icon */}
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setEditResumeId(""); // Clear ID to close modal
                  setTitle(""); // Reset title state on close
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
