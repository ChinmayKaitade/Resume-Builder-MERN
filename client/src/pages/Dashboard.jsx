import React, { useEffect, useState } from "react";
import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../configs/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import pdfToText from "react-pdftotext";

// --- Reusable Component: Modal Wrapper ---
// In a real application, this would be in its own file (e.g., ModalWrapper.jsx)
const ModalWrapper = ({ children, onClose, onSubmit }) => (
  <form
    onSubmit={onSubmit}
    onClick={onClose}
    className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
    >
      {children}
      <XIcon
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
        onClick={onClose}
      />
    </div>
  </form>
);

// --- Main Dashboard Component ---
const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Used for file upload
  const [isUpdatingTitle, setIsUpdatingTitle] = useState(false); // Used for title edit

  const navigate = useNavigate();

  // Helper function to reset form state
  const resetForm = () => {
    setTitle("");
    setResumeFile(null);
    setEditResumeId("");
  };

  // --- API Handlers ---

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: {
          Authorization: token,
        },
      });
      // Ensure we set an array to prevent .map() errors
      setAllResumes(data.resumes || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load resumes.");
    }
  };

  const createResume = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: token } }
      );
      setAllResumes([...allResumes, data.resume]);
      setShowCreateResume(false);
      resetForm();
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create resume.");
    }
  };

  const uploadResume = async (event) => {
    event.preventDefault();
    if (!resumeFile) return toast.error("Please select a file to upload.");

    setIsLoading(true);

    try {
      const resumeText = await pdfToText(resumeFile);
      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        { headers: { Authorization: token } }
      );
      setShowUploadResume(false);
      resetForm();
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to upload resume.");
    } finally {
      setIsLoading(false);
    }
  };

  const editTitle = async (event) => {
    event.preventDefault();
    setIsUpdatingTitle(true);

    try {
      const { data } = await api.put(
        `/api/resumes/update`,
        { resumeId: editResumeId, resumeData: { title } },
        { headers: { Authorization: token } }
      );

      // ✅ FIX: Correct logic to map over the array and update only the matching resume
      setAllResumes(
        allResumes.map((resume) =>
          resume._id === editResumeId ? { ...resume, title } : resume
        )
      );
      resetForm();
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update title.");
    } finally {
      setIsUpdatingTitle(false);
    }
  };

  const deleteResume = async (resumeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (confirmDelete) {
      try {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: { Authorization: token },
        });
        setAllResumes(allResumes.filter((resume) => resume._id !== resumeId));
        toast.success(data.message);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to delete resume."
        );
      }
    }
  };

  // --- Effects ---

  useEffect(() => {
    loadAllResumes();
  }, []);

  // --- Rendered JSX ---

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Joe Doe
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
              Create Resume
            </p>
          </button>

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

        <hr className="border-slate-300 my-6 sm:w-[350px]" />

        {/* Resumes Grid */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {/* ✅ FIX: Use Optional Chaining to prevent 'Cannot read properties of null (reading 'map')' */}
          {allResumes?.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <button
                key={index}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40",
                }}
              >
                <FilePenLineIcon
                  className="size-7 group-hover:scale-105 transition-all"
                  style={{ color: baseColor }}
                />

                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>

                <p
                  className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                  style={{ color: baseColor + "90" }}
                >
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 group-hover:flex items-center hidden"
                >
                  <TrashIcon
                    onClick={() => {
                      deleteResume(resume._id);
                    }}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                  />

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

        {/* Create Resume Modal */}
        {showCreateResume && (
          <ModalWrapper
            onSubmit={createResume}
            onClose={() => {
              setShowCreateResume(false);
              resetForm();
            }}
          >
            <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Enter Resume Title"
              className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
              required
            />
            <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
              Create Resume
            </button>
          </ModalWrapper>
        )}

        {/* Upload Resume Modal */}
        {showUploadResume && (
          <ModalWrapper
            onSubmit={uploadResume}
            onClose={() => {
              setShowUploadResume(false);
              resetForm();
            }}
          >
            <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Enter Resume Title"
              className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
              required
            />

            <div>
              <label
                htmlFor="resume-input"
                className="block text-sm text-slate-700"
              >
                Select Resume File
                <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                  {resumeFile ? (
                    <p className="text-green-700">{resumeFile.name}</p>
                  ) : (
                    <>
                      <UploadCloudIcon className="size-14 stroke-1" />
                      <p>Upload Resume</p>
                    </>
                  )}
                </div>
              </label>

              <input
                type="file"
                name="resume-input"
                id="resume-input"
                accept=".pdf"
                hidden
                onChange={(e) => setResumeFile(e.target.files[0])}
              />
            </div>

            <button
              disabled={isLoading}
              className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              {isLoading && (
                <LoaderCircleIcon className="animate-spin size-4 text-white" />
              )}
              {isLoading ? "Uploading..." : "Upload Resume"}
            </button>
          </ModalWrapper>
        )}

        {/* Edit Title Modal */}
        {editResumeId && (
          <ModalWrapper
            onSubmit={editTitle}
            onClose={() => {
              setEditResumeId("");
              setTitle("");
            }}
          >
            <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Enter Resume Title"
              className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
              required
            />
            <button
              disabled={isUpdatingTitle}
              className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              {isUpdatingTitle && (
                <LoaderCircleIcon className="animate-spin size-4 text-white" />
              )}
              {isUpdatingTitle ? "Updating..." : "Update"}
            </button>
          </ModalWrapper>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
