import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ExperienceForm = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [generatingIndex, setGeneratingIndex] = useState(-1);

  const addExperience = () => {
    // Define the structure of a new experience entry.
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    // Filter the array, keeping only items whose index does not match.
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    // 1. Create a shallow copy of the main array.
    const updated = [...data];

    // 2. Create a shallow copy of the specific object and update the field.
    // Handles clearing end_date if 'is_current' is checked
    if (field === "is_current" && value === true) {
      updated[index] = { ...updated[index], [field]: value, end_date: null };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }

    // Pass the new array back to the parent state.
    onChange(updated);
  };

  const generateDescription = async (index) => {
    const experience = data[index];

    // Validate required fields before calling the API
    if (!experience.position || !experience.company) {
      toast.error("Please fill in the Company Name and Job Title first.");
      return;
    }

    setGeneratingIndex(index);

    // Construct the prompt clearly
    const prompt = `enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}.`;

    try {
      const { data: responseData } = await api.post(
        "/api/ai/enhance-job-desc",
        {
          // **BUG FIX: Now using promptContent to match the refactored backend controller**
          promptContent: prompt,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Use the response data's key
      updateExperience(index, "description", responseData.enhancedContent);
      toast.success("Job description enhanced successfully!");
    } catch (error) {
      // Improved error handling
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to generate description.";
      toast.error(errorMessage);
    } finally {
      setGeneratingIndex(-1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>

          <p className="text-sm text-gray-500">Add your Job Experience</p>
        </div>

        {/* Button to Add a new Experience Entry */}
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {/* Conditional Rendering: Show message if no data exists */}
      {data.length === 0 ? (
        // Corrected JSX for the empty state
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No work experience added yet.</p>
          <p className="text-sm">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        /* List of Experience Entries */
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index} // Key is used here for mapping stability.
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                {/* Title and Remove Button */}
                <h4>Experience #{index + 1}</h4>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Input Fields */}
              <div className="grid md:grid-cols-2 gap-3">
                {/* Company Name */}
                <input
                  value={experience.company || ""}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  type="text"
                  placeholder="Company Name"
                  className="px-3 py-2 text-sm rounded-lg"
                />

                {/* Job Title */}
                <input
                  value={experience.position || ""}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  type="text"
                  placeholder="Job Title"
                  className="px-3 py-2 text-sm rounded-lg"
                />

                {/* Start Date */}
                <input
                  value={experience.start_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  type="month"
                  className="px-3 py-2 text-sm rounded-lg"
                />

                {/* End Date: Disabled if 'is_current' is checked */}
                <input
                  value={experience.end_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  type="month"
                  disabled={experience.is_current}
                  className="px-3 py-2 text-sm rounded-lg disabled:bg-gray-100"
                />
              </div>

              {/* Checkbox: Currently Working Here */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) => {
                    // updateExperience handles clearing end_date if checked
                    updateExperience(index, "is_current", e.target.checked);
                  }}
                  className="rounded border-r-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Currently working here
                </span>
              </label>

              {/* Job Description Area */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 ">
                    Job Description
                  </label>

                  {/* AI Enhance Button */}
                  <button
                    onClick={() => generateDescription(index)}
                    disabled={
                      generatingIndex === index ||
                      !experience.position ||
                      !experience.company
                    }
                    className="flex itc gap-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors disabled:opacity-50"
                  >
                    {generatingIndex === index ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}
                    Enhance with AI
                  </button>
                </div>

                {/* Description Textarea */}
                <textarea
                  rows={4}
                  value={experience.description || ""}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  className="w-full text-sm px-3 py-2 rounded-lg resize-none"
                  placeholder="Describe your key responsibilities and achievements..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
