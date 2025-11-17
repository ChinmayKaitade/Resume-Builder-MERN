import { Plus, Trash2 } from "lucide-react";
import React from "react";

/**
 * @component ProjectForm 📂
 * @description Form component for managing multiple project entries in the resume.
 * It is a controlled component, manipulating an array of project objects
 * and reporting the changes back to the parent component via the `onChange` prop.
 *
 * @param {object} props
 * @param {Array<object>} props.data - The array of project objects (passed from parent state).
 * @param {function(Array<object>): void} props.onChange - Callback to update the parent state with the new array.
 */
const ProjectForm = ({ data, onChange }) => {
  // --- Array Manipulation Handlers (Immutability is Key) ---

  /**
   * @function addProject
   * Creates a new, blank project object and appends it to the existing array.
   */
  const addProject = () => {
    // Define the structure of a new project entry.
    const newProject = {
      name: "",
      type: "",
      description: "",
      // SUGGESTION: Consider adding fields for 'live_link' (URL) and 'technologies' (array).
    };

    // Use the spread operator to create a new array instance for immutability.
    onChange([...data, newProject]);
  };

  /**
   * @function removeProject
   * Filters out the project entry at the specified index from the array.
   * @param {number} index - The index of the entry to remove.
   */
  const removeProject = (index) => {
    // Filter the array, keeping only items whose index does not match.
    const updated = data.filter((_, i) => i !== index);

    // Pass the new filtered array back to the parent state.
    onChange(updated);
  };

  /**
   * @function updateProject
   * Updates a single field within a specific project entry object.
   * @param {number} index - The index of the project entry to modify.
   * @param {string} field - The key of the field to update (e.g., 'name').
   * @param {string} value - The new value for that field.
   */
  const updateProject = (index, field, value) => {
    // 1. Create a shallow copy of the main array.
    const updated = [...data];

    // 2. Create a shallow copy of the specific object and update the field.
    updated[index] = { ...updated[index], [field]: value };

    // Pass the new array back to the parent state.
    onChange(updated);
  };

  // --- Rendered Component UI ---

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Projects
          </h3>

          <p className="text-sm text-gray-500">Add your Projects</p>
        </div>

        {/* Button to Add a new Project Entry */}
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {/* Project List Container */}
      <div className="space-y-4 mt-6">
        {/* Map through all project entries to render individual form blocks */}
        {data.map((project, index) => (
          <div
            key={index} // Key is used here for mapping stability.
            className="p-4 border border-gray-200 rounded-lg space-y-3"
          >
            <div className="flex justify-between items-start">
              {/* Title and Remove Button */}
              <h4>Project #{index + 1}</h4>
              <button
                onClick={() => removeProject(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            {/* Input Fields for a Single Project */}
            <div className="grid gap-3">
              {/* Project Name */}
              <input
                value={project.name || ""}
                onChange={(e) => updateProject(index, "name", e.target.value)}
                type="text"
                placeholder="Project Name"
                className="px-3 py-2 text-sm rounded-lg"
              />

              {/* Project Type/Role */}
              <input
                value={project.type || ""}
                onChange={(e) => updateProject(index, "type", e.target.value)}
                type="text"
                placeholder="Project Type"
                className="px-3 py-2 text-sm rounded-lg"
              />

              {/* Description Textarea */}
              <textarea
                rows={4}
                value={project.description || ""}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                placeholder="Describe your project..."
                className="w-full px-3 py-2 text-sm rounded-lg resize-none"
              />
            </div>
          </div>
        ))}

        {/* SUGGESTION: Implement conditional rendering here to show a placeholder
            if data.length is 0, similar to the Education and Experience forms. */}
      </div>
    </div>
  );
};

export default ProjectForm;
