import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react";
import React from "react";

/**
 * @component ExperienceForm 💼
 * @description Form component for managing multiple professional work experience entries.
 * It operates as a controlled component, manipulating an array of experience objects
 * and reporting the changes back to the parent component via the `onChange` prop.
 *
 * @param {object} props
 * @param {Array<object>} props.data - The array of experience objects (passed from parent state).
 * @param {function(Array<object>): void} props.onChange - Callback to update the parent state with the new array.
 */
const ExperienceForm = ({ data, onChange }) => {
  // --- Array Manipulation Handlers (Immutability is Key) ---

  /**
   * @function addExperience
   * Creates a new, blank experience object and appends it to the existing array.
   */
  const addExperience = () => {
    // Define the structure of a new experience entry.
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false, // Ensure this defaults to boolean false
    };

    // Use the spread operator to create a new array instance for immutability.
    onChange([...data, newExperience]);
  };

  /**
   * @function removeExperience
   * Filters out the experience entry at the specified index from the array.
   * @param {number} index - The index of the entry to remove.
   */
  const removeExperience = (index) => {
    // Filter the array, keeping only items whose index does not match.
    const updated = data.filter((_, i) => i !== index);

    // Pass the new filtered array back to the parent state.
    onChange(updated);
  };

  /**
   * @function updateExperience
   * Updates a single field within a specific experience entry object.
   * @param {number} index - The index of the experience entry to modify.
   * @param {string} field - The key of the field to update (e.g., 'company', 'is_current').
   * @param {*} value - The new value for that field (can be string or boolean).
   */
  const updateExperience = (index, field, value) => {
    // 1. Create a shallow copy of the main array.
    const updated = [...data];

    // 2. Create a shallow copy of the specific object and update the field.
    updated[index] = { ...updated[index], [field]: value };

    // Pass the new array back to the parent state.
    onChange(updated);
  };

  // --- Rendered Component UI ---

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
        // NOTE: The block below has a syntax error in the original code (calling ExperienceForm with JSX).
        // It should render the JSX directly without calling the component function.
        // Assuming the intent was to render the div:
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
                    // Update state with boolean value from checkbox
                    updateExperience(index, "is_current", e.target.checked);
                    // SUGGESTION: If checked, consider clearing the 'end_date' field for clean data.
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

                  {/* AI Enhance Button (Placeholder) */}
                  <button className="flex itc gap-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors disabled:opacity-50">
                    <Sparkles className="w-3 h-3" />
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
