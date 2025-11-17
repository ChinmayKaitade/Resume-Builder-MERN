import { Sparkles } from "lucide-react";
import React from "react";

/**
 * @component ProfessionalSummaryForm 📝
 * @description Form component dedicated to editing the user's professional summary (or "About Me" section).
 * It uses a single textarea field to capture a block of text.
 *
 * @param {object} props
 * @param {string} props.data - The current professional summary text (passed from parent state).
 * @param {function(string): void} props.onChange - Callback to update the parent state with the new summary text.
 * @param {function} props.setResumeData - (Optional/Advanced) Setter function for the entire parent resume state,
 * likely intended for use by complex utilities like the AI enhancer.
 */
const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  // NOTE: If the AI Enhance feature is implemented, its handler function would
  // typically go here. It would likely call an AI API, receive the enhanced text,
  // and then update the state using onChange(newText) or setResumeData.

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          {/* Section Title */}
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>

          {/* Section Subtitle */}
          <p className="text-sm text-gray-500">
            Add Summary for your resume here
          </p>
        </div>

        {/* AI Enhance Button (Placeholder) */}
        <button className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50">
          <Sparkles className="size-4" />
          AI Enhance
        </button>
      </div>

      <div className="mt-6">
        {/* Textarea Input Field */}
        <textarea
          // Use the `data` prop as the value for the controlled component.
          value={data || ""}
          // On change, pass the new text value directly back to the parent component.
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
        />

        {/* UX Tip */}
        <p className="text-xs text-gray-500 max-w-4/5 mx-auto text-center">
          Tip: Keep it concise (3-4 sentences) and focus on your most relevant
          achievements and skills.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
