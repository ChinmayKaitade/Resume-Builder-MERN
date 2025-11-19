import React, { useState } from "react";
import { Plus, Sparkles, X } from "lucide-react";

const SkillsForm = ({ data, onChange }) => {
  // State to hold the text currently being typed by the user in the input field.
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    // 1. Basic Validation: Check if the input is non-empty after trimming whitespace.
    // 2. Duplicate Check: Ensure the skill doesn't already exist in the array.
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      // Update parent state: Create a new array and append the new skill (trimmed).
      onChange([...data, newSkill.trim()]);

      // Reset the local input state.
      setNewSkill("");
    }
  };

  const removeSkill = (indexToRemove) => {
    // Filter the array immutably, keeping only elements whose index does not match indexToRemove.
    onChange(data.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission or newline behavior.
      addSkill();
    }
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          Skills
        </h3>
        <p className="text-sm text-gray-500">
          Add your technical and soft skills
        </p>
      </div>

      {/* Input Field and Add Button */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter a skill (e.g., JavaScript, Project Management)"
          className="flex-1 px-3 py-2 text-xs"
          // Controlled input: updates local state on change
          onChange={(e) => setNewSkill(e.target.value)}
          value={newSkill}
          // Custom handler for 'Enter' key submission
          onKeyDown={handleKeyPress}
        />

        {/* Add Skill Button */}
        <button
          onClick={addSkill}
          // Disable button if input is empty/whitespace only
          disabled={!newSkill.trim()}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="size-4" /> Add
        </button>
      </div>

      {/* Conditional Rendering: Show Tag List or Placeholder */}
      {data.length > 0 ? (
        // Skill Tags List
        <div className="flex flex-wrap gap-2">
          {data.map((skill, index) => (
            <span
              key={index} // Safe to use index as key since the order is controlled by user interaction here.
              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {skill}
              {/* Remove Skill Button (X icon) */}
              <button
                onClick={() => removeSkill(index)}
                className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
              >
                {/* NOTE: Ensure the icon size class 'W-3 h-3' is standard for Tailwind/Lucide */}
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        // Empty State Placeholder
        <div className="text-center py-6 text-gray-500">
          <Sparkles className="w-10 h-10 mx-auto mb-2 text-gray-300" />
          <p>No Skills added yet.</p>
          <p className="text-sm">Add your technical and soft skills above.</p>
        </div>
      )}

      {/* UX Tip Container */}
      <div className="bg-blue-50 p-3 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Tip: </strong>
          Add 8-12 relevant skills. Include both technical skills (programming
          languages, tools) and soft skills (leadership, communication).
        </p>
      </div>
    </div>
  );
};

export default SkillsForm;
